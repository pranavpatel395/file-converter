import React, { useState, useRef } from 'react';
import axios from 'axios';

function PdfToImages() {
    const [pdfFile, setPdfFile] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!pdfFile) return;

        setLoading(true); // Start loading when uploading begins
        try {
            const formData = new FormData();
            formData.append('pdf', pdfFile);

            const response = await axios.post('http://localhost:5000/api/pdf_to_images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.images) {
                setImageUrls(response.data.images.map(image => `http://localhost:5000/${image}`));
            } else {
                console.error('No images returned from the server');
                alert('An error occurred while converting the PDF to images. Please try again.');
            }
        } catch (error) {
            console.error('Error during file upload and conversion:', error.message);
            alert('An error occurred while converting the PDF to images. Please try again.');
        } finally {
            setLoading(false); // Stop loading when the process completes
        }
    };

    const handleDownloadAll = async () => {
        setLoading(true); // Start loading during download
        for (const [index, url] of imageUrls.entries()) {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `image${index + 1}.jpeg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        setLoading(false); // Stop loading after download completes
        handleClear(); // Clear the inputs
    };

    const handleClear = () => {
        setPdfFile(null);
        setImageUrls([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <div className="text-center p-5 bg-white max-w-md mx-auto shadow-lg rounded-lg mt-10">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">PDF to Images Converter</h1>
              
                <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="mb-4 border border-gray-300 p-2 rounded-md w-full"
                    disabled={loading} // Disable input while loading
                />
                <button
                    onClick={handleUpload}
                    disabled={!pdfFile || loading}
                    className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
                >
                    {loading ? 'Converting...' : 'Upload and Convert'}
                </button>

                {loading && (
                    <div className="flex justify-center mt-4">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                    </div>
                )}

                {imageUrls.length > 0 && !loading && (
                    <div className="mt-8">
                        <p className="mb-4 text-gray-700">Click the links below to view/download your images:</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                            {imageUrls.map((url, index) => (
                                <div key={index} className="border p-2 rounded-lg shadow-md">
                                    <img
                                        src={url}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-32 object-cover mb-2"
                                    />
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View Image {index + 1}
                                    </a>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleDownloadAll}
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-green-600"
                        >
                            Download All Images
                        </button>
                        <button
                            onClick={handleClear}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                        >
                            Clear
                        </button>
                    </div>
                )}
            </div>

            {/* Informational Section (Moved below the button section) */}
            <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Why Use Our PDF to Images Converter?</h2>
                <p className="text-gray-600 mb-6">
                    Convert your PDF files into high-quality images. Simply upload your PDF, and you will receive individual images for each page.
                </p>
                <p className="mb-4 text-gray-700">
                    This tool allows you to quickly convert your PDF files into individual images, making it easy to extract and use each page as needed. Whether you're looking to share pages online, include them in presentations, or simply store them as images, this converter has you covered.
                </p>
                <ul className="list-disc pl-5 text-gray-700">
                    <li className="mb-2">Fast and reliable conversion process.</li>
                    <li className="mb-2">Download all images with a single click.</li>
                    <li>Completely free to use, with no limitations on file size.</li>
                </ul>
            </div>
        </>
    );
}

export default PdfToImages;
