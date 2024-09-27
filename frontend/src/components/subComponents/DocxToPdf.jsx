import React, { useState } from 'react';
import axios from 'axios';

function DocxToPdf() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

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

        setLoading(true); // Start loading
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
        } finally {
            setLoading(false); // Stop loading
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
                    disabled={loading} // Disable input while loading
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

            {/* Informational Section */}
            <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">What is a DOCX to PDF Converter?</h2>
                <p className="mb-4 text-gray-700">
                    A DOCX to PDF converter allows you to take your Microsoft Word documents and convert them to a PDF format.
                    PDFs ensure that your document retains its formatting across different devices and operating systems.
                </p>
                <p className="mb-4 text-gray-700">
                    Simply select a DOCX file from your device, click "Upload and Convert", and our tool will handle the rest. 
                    Your PDF will be ready for download in just a few moments.
                </p>
                <p className="mb-4 text-gray-700">
                    This is especially useful for sending professional documents like resumes, contracts, or reports 
                    where you need the formatting to remain consistent.
                </p>

                <h2 className="text-lg font-semibold mb-2 text-gray-800">Tips for Successful Conversion</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    <li className="mb-2">Make sure your DOCX file is formatted correctly before conversion.</li>
                    <li className="mb-2">Remove any unnecessary content to create a cleaner PDF.</li>
                    <li>Check the converted PDF for any formatting issues or missing elements.</li>
                </ul>
            </div>
        </>
    );
}

export default DocxToPdf;
