// controllers/mergepdf.js
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

exports.mergePdfs = async (req, res) => {
  try {
    const mergedPdf = await PDFDocument.create();

    for (let i = 0; i < req.files.length; i++) {
      const pdfBytes = fs.readFileSync(req.files[i].path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfFile = await mergedPdf.save();

    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=merged.pdf',
      'Content-Length': mergedPdfFile.length,
    });

    res.end(Buffer.from(mergedPdfFile, 'binary'));

    // Cleanup uploaded files
    req.files.forEach((file) => fs.unlinkSync(file.path));
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while merging PDFs.');
  }
};
