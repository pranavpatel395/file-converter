import React, { useState } from 'react';
import axios from 'axios';

function Imgtodocx() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Please select an image file to upload.');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:5000/api/imgtodocx', formData, {
                responseType: 'blob', // Important for handling file download
            });

            // Create a URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'output.docx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

        } catch (err) {
            console.error('Error uploading file:', err);
            setError('Failed to upload and process the image.');
        } finally {
            setLoading(false);
            setFile(null);
        }
    };

    return (
        <>
            <div className="text-center p-5 bg-white max-w-lg mx-auto shadow-lg rounded-lg mt-10">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Image to DOCX Converter</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className='mb-4 border border-gray-300 rounded p-2 w-full' 
                    />
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
                    >
                        {loading ? 'Processing...' : 'Upload and Convert'}
                    </button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            {/* Informational Section */}
            <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">What is an Image to DOCX Converter?</h2>
                <p className="mb-4 text-gray-700">
                    The Image to DOCX converter allows you to transform an image file into a Word document.
                    This is perfect for creating editable documents from scanned images or sharing images in a text format.
                </p>
                <p className="mb-4 text-gray-700">
                    Simply select the image from your device, click "Upload and Convert," and your DOCX will be ready for download shortly.
                </p>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Tips for Successful Conversion</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    <li className="mb-2">Ensure your image is clear for the best document output.</li>
                    <li className="mb-2">Select images in the desired order as they will appear in the DOCX.</li>
                    <li>Check the final DOCX to ensure all content is displayed correctly.</li>
                </ul>
            </div>
        </>
    );
}

export default Imgtodocx;
