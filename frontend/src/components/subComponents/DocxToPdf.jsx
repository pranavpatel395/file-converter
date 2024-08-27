import React, { useState } from 'react';
import axios from 'axios';

function DocxToPdf() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onFileUpload = async () => {
        if (!file) {
            setMessage('Please select a DOCX file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('docx', file);

        try {
            const response = await axios.post('/api/docx_to_pdf', formData, {
                responseType: 'blob', // Important for downloading the file
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted.pdf');
            document.body.appendChild(link);
            link.click();

            setMessage('File converted successfully.');
        } catch (error) {
            console.error('Error uploading the file:', error);
            setMessage('Error uploading the file.');
        }
    };

    return (
        <div className="App">
            <h1>DOCX to PDF Converter</h1>
            <input type="file" accept=".docx" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload and Convert</button>
            <p>{message}</p>
        </div>
    );
}

export default DocxToPdf;
