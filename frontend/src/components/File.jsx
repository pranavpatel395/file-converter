// src/FileUpload.js
import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = () => {
    if (file) {
      // Handle file upload logic here
      console.log(`File selected: ${file.name}`);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">File Upload</h2>
      <input
        type="file"
        onChange={onFileChange}
        className="mb-4 border border-gray-300 rounded p-2"
      />
      <button
        onClick={onFileUpload}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
      >
        Upload
      </button>
      {file && <p className="mt-4 text-gray-500">{file.name}</p>}
    </div>
  );
};

export default FileUpload;
