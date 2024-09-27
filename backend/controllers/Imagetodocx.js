// controllers/imageController.js

const tesseract = require('tesseract.js');
const { Document, Packer, Paragraph } = require('docx');
const fs = require('fs');
const path = require('path');

const processImage = (req, res) => {
    const imagePath = req.file.path;

    const languages = 'eng+hin+guj';

    tesseract.recognize(imagePath, languages, {
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        tessedit_char_blacklist: '.,!?@#$%^&*()<>_+=-`~[]"{}|;:\\',
    })
    .then(({ data: { text } }) => {
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: lines.map(line => new Paragraph(line)),
                },
            ],
        });

        const docxFilePath = path.join(__dirname, '../output.docx');
        Packer.toBuffer(doc).then((buffer) => {
            fs.writeFileSync(docxFilePath, buffer);
            res.download(docxFilePath, 'output.docx', (err) => {
                if (err) {
                    console.error(err);
                }
                fs.unlinkSync(imagePath);
                fs.unlinkSync(docxFilePath);
            });
        });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to process image');
    });
};

module.exports = { processImage };
