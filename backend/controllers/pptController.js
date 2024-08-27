const libre = require('libreoffice-convert');
const fs = require('fs');
const path = require('path');

exports.convertFile = (req, res) => {
    const pptPath = req.file.path;
    const outputPath = `uploads/${path.parse(req.file.originalname).name}.pdf`;

    // Check the file extension
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (ext !== '.ppt' && ext !== '.pptx') {
        return res.status(400).send('Only .ppt and .pptx files are allowed!');
    }

    // Read the uploaded file
    const pptFile = fs.readFileSync(pptPath);

    // Convert the file to PDF
    libre.convert(pptFile, '.pdf', undefined, (err, done) => {
        if (err) {
            return res.status(500).send('Conversion failed');
        }

        // Save the PDF file
        fs.writeFileSync(outputPath, done);

        // Send the PDF as a response
        res.download(outputPath, (err) => {
            if (err) {
                console.error(err);
            }

            // Clean up: remove the temporary files
            fs.unlinkSync(pptPath);
            fs.unlinkSync(outputPath);
        });
    });
};
