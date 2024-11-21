const fs = require('fs').promises;
const path = require('path');
const libre = require('libreoffice-convert');
const { load } = require('@pspdfkit/nodejs');

// Set the path to the LibreOffice executable
libre.ext = '/usr/bin/libreoffice';  // Update this with the correct path

// Convert callback-based libre.convert to promise
const convertLibreAsync = (inputBuffer, outputExt) => {
  return new Promise((resolve, reject) => {
    libre.convert(inputBuffer, outputExt, undefined, (err, pdfBuffer) => {
      if (err) return reject(err);
      resolve(pdfBuffer);
    });
  });
};

const convertWithLibre = async (req, res) => {
  const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '../uploads');
  try {
    const filePath = req.file.path;
    const outputExt = 'pdf';
    const outputPath = path.join(uploadDir, `${path.parse(filePath).name}.${outputExt}`);

    const fileBuffer = await fs.readFile(filePath);

    // Convert DOCX to PDF
    const pdfBuffer = await convertLibreAsync(fileBuffer, outputExt);
    await fs.writeFile(outputPath, pdfBuffer);

    // Send the PDF back to the client
    res.download(outputPath, 'converted.pdf', async (err) => {
      if (err) console.error(`Error sending file: ${err}`);
      
      // Clean up temporary files
      try {
        await fs.unlink(filePath);
        await fs.unlink(outputPath);
      } catch (cleanupErr) {
        console.error('Error cleaning up files:', cleanupErr);
      }
    });
  } catch (err) {
    console.error(`Error converting file with LibreOffice: ${err}`);
    res.status(500).send('Internal Server Error');
  }
};

const convertWithPspdfkit = async (req, res) => {
  const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '../uploads');
  try {
    const filePath = req.file.path;
    const outputPath = path.join(uploadDir, `${path.parse(filePath).name}.pdf`);

    const fileBuffer = await fs.readFile(filePath);
    const instance = await load({ document: fileBuffer });
    
    // Convert to PDF
    const pdfBuffer = await instance.exportPDF({
      optimize: true,
      title: 'Converted Document',
      author: 'Your Name',
      subject: 'Conversion using PSPDFKit',
      keywords: 'PDF, Conversion, PSPDFKit'
    });
    await fs.writeFile(outputPath, Buffer.from(pdfBuffer));
    await instance.close();

    // Send the PDF back to the client
    res.download(outputPath, 'converted.pdf', async (err) => {
      if (err) console.error(`Error sending file: ${err}`);

      // Clean up temporary files
      try {
        await fs.unlink(filePath);
        await fs.unlink(outputPath);
      } catch (cleanupErr) {
        console.error('Error cleaning up files:', cleanupErr);
      }
    });
  } catch (err) {
    console.error(`Error converting file with PSPDFKit: ${err}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  convertWithLibre,
  convertWithPspdfkit
};
