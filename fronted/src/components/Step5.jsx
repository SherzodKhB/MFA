import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from '../services/api';

const StepFive = () => {
  const webcamRef = useRef(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [comments, setComments] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);

  // Kommentlarni yuklash
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('token'); // Tokenni olish
        const response = await axios.get('/api/comments/getcomments', {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        setComments(response.data.comments || []);
      } catch (err) {
        console.error('Error fetching comments:', err.response?.data?.message || err.message);
      }
    };
    fetchComments();
  }, []);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!capturedImage) {
      setError('Please capture an image');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Tokenni olish

      // Convert the base64 image to a Blob (file)
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], 'captured-image.jpeg', { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('comment', comment);
      formData.append('image', file); // Image ni fayl sifatida yuborish

      await axios.post('/api/comments/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Content-Typeni to‘g‘ri belgilash
        },
      });

      setSuccess(true);
      setComment('');
      setCapturedImage(null);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post comment');
    }
  };

  return (
    <div>
      <h2>Step 5: Comment</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
      />
      <button onClick={capturePhoto}>Capture Photo</button>
      {capturedImage && (
        <div>
          <h3>Preview</h3>
          <img src={capturedImage} alt="Captured" width="300" />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Komment yozing"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit Comment</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Comment submitted successfully!</p>}

      <h3>All Comments</h3>
      <ul>
        {comments.map((c) => (
          <li key={c._id}>
            <p>{c.comment}</p>
            <img src={c.imagePath} alt="User upload" width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepFive;
