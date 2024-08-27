import React, { useState } from 'react';
import axios from 'axios';
// import './App.css';

function Pdftodocx() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onFileUpload = async () => {
        if (!file) {
            setMessage('Please select a PDF file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const response = await axios.post('/api/upload', formData, {
                responseType: 'blob', // Important for downloading the file
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted.docx');
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
            <h1>PDF to Word Converter</h1>
            <input type="file" accept=".pdf" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload and Convert</button>
            <p>{message}</p>
        </div>
    );
}

export default Pdftodocx;
