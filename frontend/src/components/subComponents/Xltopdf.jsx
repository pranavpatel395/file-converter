import React, { useState } from 'react';
import axios from 'axios';

const Xltopdf = () => {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

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
    <div>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={loading}>
        {loading ? 'Converting...' : 'Convert to PDF'}
      </button>
      {loading && <div className="loader">Loading...</div>}
      {downloadUrl && (
        <a href={downloadUrl} download="converted.pdf">
          <button>Download PDF</button>
        </a>
      )}
    </div>
  );
};

export default Xltopdf;
