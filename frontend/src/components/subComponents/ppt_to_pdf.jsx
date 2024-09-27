import React, { useState } from 'react';
import axios from 'axios';

function PptToPdf() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        setLoading(true); // Start loading

        const formData = new FormData();
        formData.append('pptFile', file);

        try {
            const response = await axios.post('http://localhost:5000/api/ppttopdf', formData, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${file.name}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('There was an error converting the file!', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            <div className="text-center p-5 bg-white max-w-md mx-auto shadow-lg rounded-lg mt-10">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">PPT to PDF Converter</h1>
                <p className="text-gray-600 mb-6">
                    Upload your PPT file, and convert it to a PDF document quickly and easily.
                </p>

                <input
                    type="file"
                    accept=".ppt,.pptx"
                    onChange={handleFileChange}
                    className="mb-4 border border-gray-300 p-2 rounded-md w-full"
                    disabled={loading} // Disable input while loading
                />
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
                >
                    {loading ? 'Converting...' : 'Convert to PDF'}
                </button>

                {loading && (
                    <p className="text-gray-500">Converting your file, please wait...</p>
                )}
            </div>

            {/* Informational Section */}
            <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Why Use Our PPT to PDF Converter?</h2>
                <p className="mb-4 text-gray-700">
                    Our converter allows you to quickly transform your PowerPoint presentations into PDF documents for easy sharing and printing.
                </p>
                <ul className="list-disc pl-5 text-gray-700 mb-4">
                    <li className="mb-2">Maintain the original formatting of your presentation.</li>
                    <li className="mb-2">Easily share PDFs with colleagues and friends.</li>
                    <li>Compatible with all devices and PDF readers.</li>
                </ul>

                <h2 className="text-xl font-semibold mb-4 text-gray-800">How to Use This Converter</h2>
                <ol className="list-decimal pl-5 text-gray-700 mb-4">
                    <li className="mb-2">Click on the "Choose File" button to select your PPT document.</li>
                    <li className="mb-2">After selecting the file, click the "Convert to PDF" button.</li>
                    <li className="mb-2">Wait a moment while we process your file. You'll see a "Converting..." message.</li>
                    <li className="mb-2">Once the conversion is complete, the PDF will automatically download.</li>
                    <li>If needed, repeat the process for additional files.</li>
                </ol>

                <h2 className="text-xl font-semibold mb-4 text-gray-800">Tips for Successful Conversion</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    <li className="mb-2">Ensure your PPT file is not password-protected, as this may hinder conversion.</li>
                    <li className="mb-2">Keep your PPT size reasonable for faster processing times.</li>
                    <li>Check the converted PDF file for formatting, as some complex layouts may need adjustments.</li>
                </ul>
            </div>
        </>
    );
}

export default PptToPdf;
