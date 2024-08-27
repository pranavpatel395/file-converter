require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

// Controller function to handle PDF to PPTX conversion
exports.convertPdfToPptx = async (req, res) => {
    const pdfFilePath = req.file.path;

    try {
        const pdfFile = fs.readFileSync(pdfFilePath);

        const response = await axios.post(
            'https://api.cloudmersive.com/convert/pdf/to/pptx',
            pdfFile,
            {
                headers: {
                    'Content-Type': 'application/pdf',
                    'Apikey': process.env.CLOUDMERSIVE_API_KEY,
                },
                responseType: 'arraybuffer',
            }
        );

        // Save the PPTX file to the server
        const pptxFilePath = `uploads/${req.file.originalname.split('.')[0]}.pptx`;
        fs.writeFileSync(pptxFilePath, response.data);

        // Send the file back to the client
        res.download(pptxFilePath, () => {
            // Clean up the uploaded files
            fs.unlinkSync(pdfFilePath);
            fs.unlinkSync(pptxFilePath);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to convert PDF to PPTX');
    }
};
