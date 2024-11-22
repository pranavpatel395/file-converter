const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables

exports.convertFile = async (req, res) => {
  try {
    const pptPath = req.file.path;
    const outputPath = `uploads/${path.parse(req.file.originalname).name}.pdf`;

    // Validate file extension
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (ext !== '.ppt' && ext !== '.pptx') {
      return res.status(400).send('Only .ppt and .pptx files are allowed!');
    }

    // Prepare the form data
    const formData = new FormData();
    formData.append('instructions', JSON.stringify({ parts: [{ file: "file" }] }));
    formData.append('file', fs.createReadStream(pptPath));

    // API Request to convert file
    const response = await axios.post('https://api.nutrient.io/build', formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${process.env.NUTRIENT_API_KEY}`, // Use secured API key
      },
      responseType: 'stream',
    });

    // Write the resulting PDF file
    const pdfStream = fs.createWriteStream(outputPath);
    response.data.pipe(pdfStream);

    pdfStream.on('finish', () => {
      // Send the PDF file to the client
      res.download(outputPath, (err) => {
        if (err) console.error('Error sending file:', err);

        // Cleanup temporary files
        fs.unlinkSync(pptPath); // Uploaded PPT file
        fs.unlinkSync(outputPath); // Generated PDF
      });
    });

    pdfStream.on('error', (err) => {
      console.error('Error writing PDF file:', err);
      res.status(500).send('Error processing PDF file.');
    });
  } catch (error) {
    console.error('Error converting PPT to PDF:', error);

    // Handle specific API errors
    if (error.response && error.response.data) {
      const errorData = await streamToString(error.response.data);
      return res.status(500).send(`Conversion API Error: ${errorData}`);
    }

    res.status(500).send('Internal Server Error');
  }
};

// Helper function to convert error stream to string
function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
}
