require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const pdfController = require('../controllers/pdfControllers');
const pptController = require('../controllers/pptController');
const pdfToImageController = require('../controllers/pdfToImageController');
const pdfToDocxController = require('../controllers/PdfToDocx');
const Docxtopdf = require('../controllers/Docxtopdf');
const excelToPdfController = require('../controllers/excelToPdf');
const mergePdfController = require('../controllers/mergePdf');
const { convertPdfToPptx } = require('../controllers/pdftopptx');
const { processImage } = require('../controllers/Imagetodocx');

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

// Image to PDF route
router.post('/img_to_pdf', upload.array('images', 100), pdfController.createPdf);

// PPT to PDF route
router.post('/ppttopdf', upload.single('pptFile'), pptController.convertFile);

// PDF to images route
router.post('/pdf_to_images', (req, res, next) => {
    const pdfUpload = upload.single('pdf');
    pdfUpload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload error', error: err.message });
        }
        next();
    });
}, pdfToImageController.convertPdfToImages);

// PDF to DOCX route
router.post('/upload', upload.single('pdf'), pdfToDocxController.pdfToDocx);

// Docx to PDF route
router.post('/docx_to_pdf', upload.single('docx'), Docxtopdf.docxToPdf);

router.post('/convert', upload.single('file'), excelToPdfController.convertWithLibre);
router.post('/convert-pspdfkit', upload.single('file'), excelToPdfController.convertWithPspdfkit);

// Merge PDFs route
router.post('/mergePdf', upload.array('pdfs', 2), mergePdfController.mergePdfs);

// PDF to PPTX route
router.post('/convert-pdf-to-ppt', upload.single('pdfFile'), convertPdfToPptx);

router.post('/imgtodocx', upload.single('image'), processImage);

module.exports = router;
