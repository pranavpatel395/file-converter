import React, { useState } from 'react';
import axios from 'axios';

const Xltopdf = () => {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    setLoading(true); // Show loading indicator

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Important for downloading the file
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url); // Set the download URL
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <>
      <div className="text-center p-5 bg-white max-w-lg mx-auto shadow-lg rounded-lg mt-10">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Excel to PDF Converter</h1>
       

        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={handleFileChange}
          className="mb-4 border border-gray-300 p-2 rounded-md w-full"
          disabled={loading} // Disable input while loading
        />
        <button
          onClick={handleFileUpload}
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
        >
          {loading ? 'Converting...' : 'Convert to PDF'}
        </button>

        {loading && <div className="text-gray-500">Converting your file, please wait...</div>}
        {downloadUrl && (
          <a href={downloadUrl} download="converted.pdf">
            <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg">Download PDF</button>
          </a>
        )}
      </div>

      {/* Informational Section */}
      <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Why Use Our Excel to PDF Converter?</h2>
        <p className="mb-4 text-gray-700">
          Our converter allows you to quickly turn your Excel spreadsheets into PDF documents, making them easier to share and print.
        </p>
        <ul className="list-disc pl-5 text-gray-700 mb-4">
          <li className="mb-2">Maintain the layout and formatting of your spreadsheets.</li>
          <li className="mb-2">Easy to share with anyone, even if they don’t have Excel.</li>
          <li>Securely convert sensitive data into non-editable PDFs.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">How to Use This Converter</h2>
        <ol className="list-decimal pl-5 text-gray-700 mb-4">
          <li className="mb-2">Click on the "Choose File" button to select your Excel document.</li>
          <li className="mb-2">After selecting the file, click the "Convert to PDF" button.</li>
          <li className="mb-2">Wait while we process your file. You'll see a "Converting..." message.</li>
          <li className="mb-2">Once the conversion is complete, you will see the download button.</li>
          <li>If needed, repeat the process for additional files.</li>
        </ol>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">Tips for Successful Conversion</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li className="mb-2">Ensure your Excel file is properly formatted for the best results.</li>
          <li className="mb-2">Remove any unnecessary data before conversion for a cleaner PDF.</li>
          <li>Check the converted PDF file to ensure all data is displayed correctly.</li>
        </ul>
      </div>
    </>
  );
};

export default Xltopdf;
