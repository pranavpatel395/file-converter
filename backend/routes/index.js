require('dotenv').config();
const express = require('express');
const User = require('../models/User'); // Adjust the path as needed
const bcrypt = require('bcrypt'); // Use bcrypt for password hashing
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken'); // JWT for secure token-based authentication
const rateLimit = require('express-rate-limit'); // For rate limiting to prevent brute-force attacks
const pdfController = require('../controllers/pdfControllers');
const pptController = require('../controllers/pptController');
const pdfToImageController = require('../controllers/pdfToImageController');
const pdfToDocxController = require('../controllers/PdfToDocx');
const Docxtopdf = require('../controllers/Docxtopdf');
const excelToPdfController = require('../controllers/excelToPdf');
const mergePdfController = require('../controllers/mergePdf');
const { convertPdfToPptx } = require('../controllers/pdftopptx');
const { processImage } = require('../controllers/Imagetodocx');
const authController = require('../controllers/authController');
// const contactRoutes = require('../controllers/contactback');

const router = express.Router();

// Common storage configuration for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, process.env.UPLOAD_DIR || '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Multer instance with file size limit
const upload = multer({
    storage: storage,
    limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE, 10) * 1024 * 1024 } // 100 MB
});

// Rate limiter to prevent brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
});
router.use(limiter);

// Middleware for checking JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token. Access forbidden.' });
        }
        req.user = user; // Attach user info to the request
        next(); // Proceed to the next middleware or route handler
    });
};




// Route protection
const requireAuth = (req, res, next) => {
    authenticateToken(req, res, next);
};

// Register and login routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Secure file upload routes with authentication and input validation
router.post('/img_to_pdf', requireAuth, upload.array('images', 100), pdfController.createPdf);
router.post('/ppttopdf', requireAuth, upload.single('pptFile'), pptController.convertFile);

// PDF to images route with authentication and error handling
router.post('/pdf_to_images', requireAuth, (req, res, next) => {
    const pdfUpload = upload.single('pdf');
    pdfUpload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload error', error: err.message });
        }
        next();
    });
}, pdfToImageController.convertPdfToImages);

// Secure other file conversion routes with authentication
router.post('/upload', requireAuth, upload.single('pdf'), pdfToDocxController.pdfToDocx);
router.post('/docx_to_pdf', requireAuth, upload.single('docx'), Docxtopdf.docxToPdf);
router.post('/Xltopdf', requireAuth, upload.single('file'), excelToPdfController.convertWithLibre);
router.post('/convert-pspdfkit', requireAuth, upload.single('file'), excelToPdfController.convertWithPspdfkit);
router.post('/mergePdf', requireAuth, upload.array('pdfs', 2), mergePdfController.mergePdfs, (req, res) => {
    // Handle successful response
    res.status(200).json({ message: 'PDFs merged successfully' });
});

router.post('/convert-pdf-to-ppt', requireAuth, upload.single('pdfFile'), convertPdfToPptx);
router.post('/imgtodocx', requireAuth, upload.single('image'), processImage);

// router.use('/contact', contactRoutes);

module.exports = router;
