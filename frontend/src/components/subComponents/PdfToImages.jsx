import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function PdfToImages() {
    const [pdfFile, setPdfFile] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Reset images when pdfFile changes
        if (!pdfFile) {
            setImageUrls([]);
        }
    }, [pdfFile]);

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!pdfFile) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('pdf', pdfFile);

            // Retrieve the token
            const token = localStorage.getItem('token');
            if (!token) {
                alert('No token found. Please log in.');
                setLoading(false);
                return;
            }

            const response = await axios.post(
                'http://localhost:5000/api/pdf_to_images',
                formData,
                {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );

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
            setLoading(false);
        }
    };

    const handleDownloadAll = async () => {
        setLoading(true);
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

        setLoading(false);
        handleClear();
    };

    const handleClear = () => {
        setPdfFile(null);
        setImageUrls([]);
        
        // Clear the input file reference and reset file input
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
                    disabled={loading} 
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
                        {/* <button
                            onClick={handleClear}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                        >
                            Clear
                        </button> */}
                    </div>
                )}
            </div>
        </>
    );
}

export default PdfToImages;
