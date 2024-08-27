const path = require('path');
const fs = require('fs');
const pdfPoppler = require('pdf-poppler');

exports.convertPdfToImages = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const pdfFilePath = req.file.path;
    const outputDir = path.join(__dirname, '..', 'uploads', 'images');
    const outputPattern = path.join(outputDir, 'page');

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const options = {
        format: 'jpeg',
        out_dir: outputDir,
        out_prefix: 'page',
        page: null // Convert all pages
    };

    try {
        await pdfPoppler.convert(pdfFilePath, options);
        const files = fs.readdirSync(outputDir).map(file => `uploads/images/${file}`);
        
        res.json({ images: files });

        // Cleanup: Delete the uploaded PDF file
        fs.unlink(pdfFilePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error deleting the PDF file:', unlinkErr.message);
            }
        });
    } catch (error) {
        console.error('Error converting PDF to images:', error);
        res.status(500).json({ message: 'Error converting PDF to images', error: error.message });
    }
};
