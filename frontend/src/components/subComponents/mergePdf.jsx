// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function mergePdf() {
  const [fileInputs, setFileInputs] = useState([{ id: 1, file: null }]);

  // Handle file input changes
  const handleFileChange = (index, e) => {
    const newFileInputs = [...fileInputs];
    newFileInputs[index].file = e.target.files[0];
    setFileInputs(newFileInputs);
  };

  // Add a new file input field
  const addFileInput = () => {
    setFileInputs([...fileInputs, { id: fileInputs.length + 1, file: null }]);
  };

  // Remove a file input field
  const removeFileInput = (index) => {
    const newFileInputs = fileInputs.filter((_, i) => i !== index);
    setFileInputs(newFileInputs);
  };

  // Handle merging PDFs
  const handleMerge = async () => {
    const formData = new FormData();
    fileInputs.forEach((input, index) => {
      if (input.file) {
        formData.append('pdfs', input.file);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/api/mergePdf', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'merged.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('There was an error merging the PDFs!', error);
    }
  };

  return (
    <div>
      <h1>Merge PDF Files</h1>
      {fileInputs.map((input, index) => (
        <div key={input.id} style={{ marginBottom: '10px' }}>
          <input
            type="file"
            onChange={(e) => handleFileChange(index, e)}
            accept=".pdf"
          />
          {fileInputs.length > 1 && (
            <button type="button" onClick={() => removeFileInput(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addFileInput}>
        Add Another File
      </button>
      <br />
      <button onClick={handleMerge}>Merge PDFs</button>
    </div>
  );
}

export default mergePdf;
