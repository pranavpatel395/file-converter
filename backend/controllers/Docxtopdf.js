const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const puppeteer = require('puppeteer');

const docxToPdf = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            throw new Error('No file uploaded.');
        }

        const uploadDir = process.env.TEMP_UPLOAD_DIR || path.join(__dirname, '../uploads');
        const docxPath = file.path;
        const htmlPath = path.join(uploadDir, `${file.filename}.html`);
        const pdfPath = path.join(uploadDir, `${file.filename}.pdf`);

        // Convert DOCX to HTML
        const result = await mammoth.convertToHtml({ path: docxPath });
        let htmlContent = result.value;

        // Embed CSS styles for margins and font size
        const styles = `
            <style>
                body { font-size: 20px; margin-left: 50px; margin-right: 50px; }
                table { width: 100%; border-collapse: collapse; }
                table, th, td { border: 1px solid black; }
                th, td { padding: 8px; text-align: left; }
            </style>
        `;
        htmlContent = `<!DOCTYPE html><html><head>${styles}</head><body>${htmlContent}</body></html>`;

        // Save the HTML content to a file
        fs.writeFileSync(htmlPath, htmlContent);

        // Convert HTML to PDF using Puppeteer
        const browserOptions = process.env.PUPPETEER_NO_SANDBOX ? { args: ['--no-sandbox', '--disable-setuid-sandbox'] } : {};
        const browser = await puppeteer.launch(browserOptions);
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
        await browser.close();

        // Send the PDF back to the client
        res.download(pdfPath, 'converted.pdf', (err) => {
            if (err) {
                console.error('Error sending the file:', err);
                res.status(500).send('Error sending the file.');
            }

            // Clean up temporary files
            try {
                fs.unlinkSync(docxPath);
                fs.unlinkSync(htmlPath);
                fs.unlinkSync(pdfPath);
            } catch (cleanupErr) {
                console.error('Error cleaning up files:', cleanupErr);
            }
        });
    } catch (err) {
        console.error('Error processing the file:', err.message);
        res.status(500).send(`Error processing the file: ${err.message}`);
    }
};

module.exports = { docxToPdf };
