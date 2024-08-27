import React, { useState, useRef } from 'react';
import axios from 'axios';

function ImgToPdf() {
    const [images, setImages] = useState([]);
    const [pdfUrl, setPdfUrl] = useState('');
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files)); // Convert FileList to Array for unlimited uploads
    };

    const handleUpload = async () => {
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
        <div className='flex flex-col items-center p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-10' style={{ textAlign: 'center', padding: '20px' }}>
            <h1 className='text-2xl font-bold mb-4'>Image to PDF Converter</h1>
            <input className='mb-4 border border-gray-300 rounded p-2' type="file" multiple onChange={handleImageChange} ref={fileInputRef} />
            <button className='bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700' onClick={handleUpload} disabled={images.length === 0}>Upload and Convert</button>
            {pdfUrl && (
                <div>
                    <p className='py-5'>Click the link below to download your PDF:</p>
                    <a href={pdfUrl} download="output.pdf" onClick={handleDownloadClick} className='bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700'>Download PDF</a>
                </div>
            )}
        </div>
        </>
    );
}

export default ImgToPdf;
