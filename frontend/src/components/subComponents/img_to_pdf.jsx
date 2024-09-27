import React, { useState, useRef } from 'react';
import axios from 'axios';

function ImgToPdf() {
    const [images, setImages] = useState([]);
    const [pdfUrl, setPdfUrl] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files)); // Convert FileList to Array for unlimited uploads
    };

    const handleUpload = async () => {
        if (images.length === 0) {
            alert('Please select at least one image to upload.');
            return;
        }

        setLoading(true); // Start loading
        try {
            const formData = new FormData();
            images.forEach((image) => formData.append('images', image));

            const response = await axios.post('http://localhost:5000/api/img_to_pdf', formData, {
                timeout: 60000,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.pdfPath) {
                const pdfUrl = `http://localhost:5000/${response.data.pdfPath}`;
                setPdfUrl(pdfUrl);
            } else {
                console.error('No PDF path returned from the server');
                alert('An error occurred while converting the images to PDF. Please try again.');
            }
        } catch (error) {
            console.error('Error during file upload and conversion:', error.message);
            alert('An error occurred while converting the images to PDF. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleDownloadClick = () => {
        setImages([]);
        setPdfUrl('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <div className="text-center p-5 bg-white max-w-lg mx-auto shadow-lg rounded-lg mt-10">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Image to PDF Converter</h1>
                
                <input 
                    className='mb-4 border border-gray-300 rounded p-2 w-full' 
                    type="file" 
                    multiple 
                    onChange={handleImageChange} 
                    ref={fileInputRef} 
                />
                <button 
                    className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`} 
                    onClick={handleUpload} 
                    disabled={loading || images.length === 0}
                >
                    {loading ? 'Converting...' : 'Upload and Convert'}
                </button>

                {loading && <div className="text-gray-500 mt-4">Converting your images to PDF, please wait...</div>}
                
                {pdfUrl && (
                    <div>
                        <p className='py-5'>Click the link below to download your PDF:</p>
                        <a 
                            href={pdfUrl} 
                            download="output.pdf" 
                            onClick={handleDownloadClick} 
                            className='bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600'
                        >
                            Download PDF
                        </a>
                    </div>
                )}
            </div>

            {/* Informational Section */}
            <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">What is an Image to PDF Converter?</h2>
                <p className="mb-4 text-gray-700">
                    The Image to PDF converter allows you to transform multiple image files into a single PDF document.
                    This is perfect for creating PDF albums, sharing multiple images in a compact format, or converting scanned documents into PDFs.
                </p>
                <p className="mb-4 text-gray-700">
                    Simply select the images from your device, click "Upload and Convert," and your PDF will be ready for download shortly.
                </p>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Tips for Successful Conversion</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    <li className="mb-2">Ensure your images are of good quality for the best PDF output.</li>
                    <li className="mb-2">Select images in the desired order as they will appear in the PDF.</li>
                    <li>Check the final PDF to ensure all images are displayed correctly.</li>
                </ul>
            </div>
        </>
    );
}

export default ImgToPdf;
