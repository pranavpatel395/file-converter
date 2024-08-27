import React, { useState } from 'react';
import axios from 'axios';

function pdfToPptx() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('pdfFile', file);

        try {
            const response = await axios.post('http://localhost:5000/api/convert-pdf-to-ppt', formData, {
                responseType: 'blob',
            });

            // Create a URL for the downloaded PPTX file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted-file.pptx');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error converting file:', error);
        }
    };

    return (
        <div className="App">
            <h1>Convert PDF to PPTX</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".pdf" onChange={handleFileChange} />
                <button type="submit">Convert</button>
            </form>
        </div>
    );
}

export default pdfToPptx;
