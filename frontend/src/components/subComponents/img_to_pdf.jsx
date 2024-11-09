import React, { useState, useRef } from 'react';
import axios from 'axios';

function ImgToPdf() {
    const [images, setImages] = useState([]);
    const [pdfUrl, setPdfUrl] = useState('');
    const [loading, setLoading] = useState(false);
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

            // Retrieve token from localStorage or sessionStorage
            const token = localStorage.getItem('token'); // Assuming token is saved here

            // Check if the token is valid
            if (!token) {
                alert('Please log in first.');
                return;
            }

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/img_to_pdf`, formData,  {
                timeout: 60000,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Add token here
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
            if (error.response && error.response.status === 403) {
                alert('Unauthorized access. Please log in again.');
            } else {
                alert('An error occurred while converting the images to PDF. Please try again.');
            }
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
        </>
    );
}

export default ImgToPdf;
