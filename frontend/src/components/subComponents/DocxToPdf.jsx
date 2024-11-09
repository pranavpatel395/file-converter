import React, { useState } from 'react';
import axios from 'axios';

function DocxToPdf() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            setFile(selectedFile);
            setMessage('');
        } else {
            setMessage('Please select a valid DOCX file.');
        }
    };

    const onFileUpload = async () => {
        if (!file) {
            setMessage('Please select a DOCX file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('docx', file);

        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('No token found. Please log in.');
            return;
        }

        setLoading(true);
        try {
            console.log("API URL:", import.meta.env.VITE_API_URL);  // Check if the URL is correct
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/docx_to_pdf`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();

            setMessage('File converted successfully.');
        } catch (error) {
            console.error('Error uploading the file:', error);
            setMessage(error.response?.data?.message || 'Error uploading the file.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="text-center p-5 bg-white max-w-lg mx-auto shadow-lg rounded-lg mt-10">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">DOCX to PDF Converter</h1>
                <input 
                    type="file" 
                    accept=".docx" 
                    onChange={onFileChange} 
                    className="mb-4 border border-gray-300 p-2 rounded-md w-full"
                    disabled={loading}
                />
                <button 
                    onClick={onFileUpload} 
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
                >
                    {loading ? 'Converting...' : 'Upload and Convert'}
                </button>
                {loading && <div className="text-gray-500">Converting your file, please wait...</div>}
                <p className="text-center text-red-500 mt-4">{message}</p>
            </div>
        </>
    );
}

export default DocxToPdf;
