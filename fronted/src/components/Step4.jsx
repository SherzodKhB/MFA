import React, { useState } from 'react';
import axios from 'axios';

const StepFour = ({ onNext }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token'); // Tokenni olish
      await axios.post('/api/user/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      onNext();
    } catch (err) {
      setError(err.response?.data?.message || 'Image upload failed');
    }
  };

  return (
    <div>
      <h2>Step 4: Upload Image</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default StepFour;
