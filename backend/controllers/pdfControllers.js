const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

// Load environment variables
require('dotenv').config();

const UPLOADS_DIR = process.env.UPLOADS_DIR || './uploads';

exports.createPdf = (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files were uploaded' });
    }

    const pdfDoc = new PDFDocument();
    const pdfFileName = `output_${Date.now()}.pdf`;
    const pdfPath = path.join(__dirname, '..', UPLOADS_DIR, pdfFileName);

    const writeStream = fs.createWriteStream(pdfPath);
    pdfDoc.pipe(writeStream);

    req.files.forEach((file, index) => {
        if (index > 0) pdfDoc.addPage();
        pdfDoc.image(file.path, { fit: [500, 400], align: 'center', valign: 'center' });

        // Delete the temporary file after processing it
        fs.unlink(file.path, (err) => {
            if (err) console.error(`Failed to delete ${file.path}:`, err.message);
        });
    });

    pdfDoc.end();

    writeStream.on('finish', () => {
        res.json({ pdfPath: `${UPLOADS_DIR}/${pdfFileName}` });
    });

    writeStream.on('error', (error) => {
        res.status(500).json({ message: 'Failed to create PDF', error: error.message });
    });
};
