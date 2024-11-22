const fs = require('fs'); // Regular fs module for createWriteStream
const fsp = require('fs').promises; // Promises API for async file operations
const path = require('path');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

const excelToPdf = async (req, res) => {
  const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '../uploads');
  try {
    const filePath = req.file.path;
    const outputPath = path.join(uploadDir, `${path.parse(filePath).name}.pdf`);

    // Read Excel file using ExcelJS
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    // Create a new PDF document with custom settings
    const pdfDoc = new PDFDocument({
      size: 'A4', // Default paper size
      layout: 'portrait', // Portrait orientation (use 'landscape' for horizontal)
      margin: 20, // Margin in points
    });

    const pdfStream = fs.createWriteStream(outputPath); // Writable stream
    pdfDoc.pipe(pdfStream);

    workbook.eachSheet((worksheet, sheetId) => {
      const printArea = worksheet.pageSetup.printArea || worksheet.getSheetValues();
      pdfDoc.fontSize(16).text(`Sheet: ${worksheet.name}`, { underline: true, align: 'center' });

      // Add worksheet content
      worksheet.eachRow({ includeEmpty: true }, (row, rowIndex) => {
        // Convert row values to a printable string
        const rowValues = row.values
          .map((value) => (value !== null && value !== undefined ? value.toString() : ''))
          .join(' | ');
        pdfDoc.fontSize(10).text(rowValues, {
          align: 'auto', // Fit visible content
          paragraphGap: 2,
        });
      });

      // Add a page break if there are more sheets
      pdfDoc.addPage();
    });

    pdfDoc.end();

    // Wait for PDF to finish writing
    await new Promise((resolve, reject) => {
      pdfStream.on('finish', resolve);
      pdfStream.on('error', reject);
    });

    // Send the PDF back to the client
    res.download(outputPath, `${path.parse(filePath).name}.pdf`, async (err) => {
      if (err) console.error(`Error sending file: ${err}`);

      // Cleanup temporary files
      try {
        await fsp.unlink(filePath); // Uploaded Excel file
        await fsp.unlink(outputPath); // Generated PDF
      } catch (cleanupErr) {
        console.error('Error cleaning up files:', cleanupErr);
      }
    });
  } catch (err) {
    console.error(`Error converting Excel to PDF: ${err}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  excelToPdf,
};
