import React, { useState, useRef } from 'react';
import axios from 'axios';

function PdfToImages() {
    const [pdfFile, setPdfFile] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handleUpload = async () => {
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
        }
    };

    const handleDownloadAll = async () => {
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

        // Clear selected file and images
        handleClear();
    };

    const handleClear = () => {
        setPdfFile(null);
        setImageUrls([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="text-center p-5 bg-white">
            <h1 className="text-2xl font-bold mb-5">PDF to Images Converter</h1>
            <input 
                type="file" 
                onChange={handleFileChange} 
                ref={fileInputRef} 
                className="mb-5"
            />
            <button 
                onClick={handleUpload} 
                disabled={!pdfFile} 
                className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
            >
                Upload and Convert
            </button>
            {imageUrls.length > 0 && (
                <div>
                    <p className="mb-5">Click the links below to view/download your images:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
                        {imageUrls.map((url, index) => (
                            <div key={index} className="border p-2 rounded shadow">
                                <img 
                                    src={url} 
                                    alt={`Image ${index + 1}`} 
                                    className="w-full h-32 object-cover mb-2"
                                />
                                <a 
                                    href={url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500"
                                >
                                    View Image {index + 1}
                                </a>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={handleDownloadAll} 
                        className="bg-green-500 text-white px-4 py-2 rounded mb-5"
                    >
                        Download All Images
                    </button>
                    <button 
                        onClick={handleClear} 
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
}

export default PdfToImages;
