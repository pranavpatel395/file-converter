import React, { useState } from 'react';
import axios from 'axios';

function ppt_to_pdf() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('pptFile', file);

        axios.post('http://localhost:5000/api/ppttopdf', formData, {
          responseType: 'blob',
      })
      .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${file.name}.pdf`);
          document.body.appendChild(link);
          link.click();
      })
      .catch(error => {
          console.error('There was an error converting the file!', error);
      });
      
      
      
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Convert to PDF</button>
        </div>
    );
}

export default  ppt_to_pdf;
