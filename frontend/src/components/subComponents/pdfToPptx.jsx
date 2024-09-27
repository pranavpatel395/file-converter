import React, { useState } from 'react';
import axios from 'axios';

function PdfToPptx() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) return;

        setLoading(true); // Start loading
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
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            <div className="text-center p-5 bg-white max-w-md mx-auto shadow-lg rounded-lg mt-10">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">PDF to PPTX Converter</h1>
               

                <form onSubmit={handleSubmit} className="mb-6">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="mb-4 border border-gray-300 p-2 rounded-md w-full"
                        disabled={loading} // Disable input while loading
                    />
                    <button
                        type="submit"
                        disabled={!file || loading}
                        className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
                    >
                        {loading ? 'Converting...' : 'Convert to PPTX'}
                    </button>
                </form>

                {loading && (
                    <p className="text-gray-500">Converting your file, please wait...</p>
                )}
            </div>

            {/* Informational Section */}
            <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Why Use Our PDF to PPTX Converter?</h2>
                <p className="mb-4 text-gray-700">
                    Our converter allows you to seamlessly convert PDF files into editable PowerPoint presentations.
                    Whether you're looking to present your content or make adjustments, this tool helps you get it done.
                </p>
                <ul className="list-disc pl-5 text-gray-700 mb-4">
                    <li className="mb-2">Fast and reliable conversion process.</li>
                    <li className="mb-2">High-quality conversion with editable slides.</li>
                    <li>Completely free to use, with no limitations on file size.</li>
                </ul>

                <h2 className="text-xl font-semibold mb-4 text-gray-800">How to Use This Converter</h2>
                <ol className="list-decimal pl-5 text-gray-700 mb-4">
                    <li className="mb-2">Click on the "Choose File" button to select your PDF document.</li>
                    <li className="mb-2">After selecting the file, click the "Convert to PPTX" button.</li>
                    <li className="mb-2">Wait a moment while we process your file. You'll see a "Converting..." message.</li>
                    <li className="mb-2">Once the conversion is complete, your PPTX file will automatically download.</li>
                    <li>If needed, repeat the process for additional files.</li>
                </ol>

                <h2 className="text-xl font-semibold mb-4 text-gray-800">Tips for Successful Conversion</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    <li className="mb-2">Ensure your PDF file is not password-protected, as this may hinder conversion.</li>
                    <li className="mb-2">Keep your PDF size reasonable for faster processing times.</li>
                    <li>Check the converted PPTX file for formatting, as some complex layouts may need adjustments.</li>
                </ul>
            </div>
        </>
    );
}

export default PdfToPptx;
