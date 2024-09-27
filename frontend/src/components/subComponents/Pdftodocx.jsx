import React, { useState } from 'react';
import axios from 'axios';

function Pdftodocx() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // State for loader
    const [downloadUrl, setDownloadUrl] = useState(null); // State for download URL

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

        setLoading(true); // Start loading when file upload begins

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
        } finally {
            setLoading(false); // Stop loading when upload finishes
        }
    };

    return (
        <>
            <div className="text-center p-5 bg-white max-w-lg mx-auto shadow-lg rounded-lg mt-10">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">PDF to Word Converter</h1>
                
                <input
                    type="file"
                    accept=".pdf"
                    onChange={onFileChange}
                    className="mb-4 border border-gray-300 p-2 rounded-md w-full"
                    disabled={loading} // Disable input while loading
                />
                <button
                    onClick={onFileUpload}
                    className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Converting...' : 'Upload and Convert'}
                </button>

                {loading && (
                    <div className="flex justify-center mt-4">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                    </div>
                )}
                <p className="mt-4 text-gray-600">{message}</p>
            </div>

            {/* Informational Section */}
            <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Why Use Our PDF to Word Converter?</h2>
                <p className="mb-4 text-gray-700">
                    Our converter allows you to quickly turn your PDF documents into editable Word files, making it easier to modify and update content.
                </p>
                <ul className="list-disc pl-5 text-gray-700 mb-4">
                    <li className="mb-2">Easily edit your documents without starting from scratch.</li>
                    <li className="mb-2">Retain the formatting and layout of your original PDF.</li>
                    <li>Convert sensitive documents securely into editable formats.</li>
                </ul>

                <h2 className="text-xl font-semibold mb-4 text-gray-800">How to Use This Converter</h2>
                <ol className="list-decimal pl-5 text-gray-700 mb-4">
                    <li className="mb-2">Click on the "Choose File" button to select your PDF document.</li>
                    <li className="mb-2">After selecting the file, click the "Upload and Convert" button.</li>
                    <li className="mb-2">Wait while we process your file. You'll see a "Converting..." message.</li>
                    <li className="mb-2">Once the conversion is complete, the document will download automatically.</li>
                    <li>If needed, repeat the process for additional files.</li>
                </ol>

                <h2 className="text-xl font-semibold mb-4 text-gray-800">Tips for Successful Conversion</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    <li className="mb-2">Ensure your PDF file is well-structured for the best results.</li>
                    <li className="mb-2">Remove any unnecessary elements from the PDF for cleaner conversion.</li>
                    <li>Review the converted DOCX file to ensure all content is accurate and formatted correctly.</li>
                </ul>
            </div>
        </>
    );
}

export default Pdftodocx;
