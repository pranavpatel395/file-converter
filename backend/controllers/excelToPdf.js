const fs = require('fs').promises;
const path = require('path');
const libre = require('libreoffice-convert');
const { load } = require('@pspdfkit/nodejs');

const convertWithLibre = async (req, res) => {
  try {
    const filePath = req.file.path;
    const outputExt = 'pdf';
    const outputPath = path.join(__dirname, '../uploads', `${path.parse(filePath).name}.${outputExt}`);

    const fileBuffer = await fs.readFile(filePath);

    libre.convert(fileBuffer, outputExt, undefined, async (err, pdfBuffer) => {
      if (err) {
        console.error(`Error converting file: ${err}`);
        return res.status(500).send('Internal Server Error');
      }
      await fs.writeFile(outputPath, pdfBuffer);

      res.download(outputPath, 'converted.pdf', async (err) => {
        if (err) {
          console.error(`Error sending file: ${err}`);
        }
        await fs.unlink(filePath);
        await fs.unlink(outputPath);
      });
    });
  } catch (err) {
    console.error(`Error converting file: ${err}`);
    res.status(500).send('Internal Server Error');
  }
};

const convertWithPspdfkit = async (req, res) => {
  try {
    const filePath = req.file.path;
    const outputPath = path.join(__dirname, '../uploads', `${path.parse(filePath).name}.pdf`);

    const fileBuffer = await fs.readFile(filePath);
    const instance = await load({ document: fileBuffer });
    const pdfBuffer = await instance.exportPDF({
      optimize: true,
      title: 'Converted Document',
      author: 'Your Name',
      subject: 'Conversion using PSPDFKit',
      keywords: 'PDF, Conversion, PSPDFKit'
    });
    await fs.writeFile(outputPath, Buffer.from(pdfBuffer));
    await instance.close();

    res.download(outputPath, 'converted.pdf', async (err) => {
      if (err) {
        console.error(`Error sending file: ${err}`);
      }
      await fs.unlink(filePath);
      await fs.unlink(outputPath);
    });
  } catch (err) {
    console.error(`Error converting file: ${err}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  convertWithLibre,
  convertWithPspdfkit
};
