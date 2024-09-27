import React, { useState } from 'react';
import axios from 'axios';

function MergePdf() {
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
    <>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Merge PDF Files</h1>

        {fileInputs.map((input, index) => (
          <div key={input.id} className="flex items-center mb-4">
            <input
              type="file"
              onChange={(e) => handleFileChange(index, e)}
              accept=".pdf"
              className="border border-gray-300 p-2 rounded-md w-full"
            />
            {fileInputs.length > 1 && (
              <button
                type="button"
                onClick={() => removeFileInput(index)}
                className="ml-2 text-red-500 font-semibold hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addFileInput}
          className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
        >
          Add Another File
        </button>

        <br />

        <button
          onClick={handleMerge}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 mt-4"
        >
          Merge PDFs
        </button>
      </div>

      {/* Text section below the upload form */}
      <div className="max-w-3xl mx-auto mt-8 text-center text-gray-600">
        <h2 className="text-xl font-semibold mb-4">What is PDF Merging?</h2>
        <p className="mb-4">
          PDF merging allows you to combine multiple PDF files into a single document, which can make it easier to organize
          and share your content. Whether you're merging reports, invoices, or images, this tool simplifies the process.
        </p>
        <p className="mb-4">
          Just upload your files, click "Merge PDFs," and your new merged PDF will be ready for download within moments.
          This tool supports multiple PDF files and ensures a quick and secure conversion process.
        </p>
      </div>
    </>
  );
}

export default MergePdf;
