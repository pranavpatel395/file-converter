const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Controller function to handle file upload and conversion
const pdfToDocx = (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            throw new Error('No file uploaded.');
        }

        const pdfPath = file.path;
        const docxPath = path.join(__dirname, '../uploads', `${file.filename}.docx`);

        // Specify the exact path to the Python executable
        const pythonExecutable = 'python';

        // Full path to the Python script
        const pythonScriptPath = path.join(__dirname, 'pdf_to_docx.py');

        // Call the Python script to convert PDF to DOCX
        exec(`${pythonExecutable} "${pythonScriptPath}" "${pdfPath}" "${docxPath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing Python script: ${error.message}`);
                return res.status(500).send(`Error converting the file: ${error.message}`);
            }

            if (stderr) {
                console.error(`Python script stderr: ${stderr}`);
            }

            console.log(`Python script stdout: ${stdout}`);

            // Send the converted file back to the client
            res.download(docxPath, 'converted.docx', (err) => {
                if (err) {
                    console.error('Error sending the file:', err);
                    res.status(500).send('Error converting the file.');
                }

                // Clean up temporary files
                fs.unlinkSync(pdfPath);
                fs.unlinkSync(docxPath);
            });
        });
    } catch (err) {
        console.error('Error processing the file:', err.message);
        res.status(500).send(`Error processing the file: ${err.message}`);
    }
};

module.exports = { pdfToDocx };
