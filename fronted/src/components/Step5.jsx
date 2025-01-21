import React, { useState } from 'react';
import axios from 'axios';

const StepFive = () => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Tokenni olish
      await axios.post(
        '/api/comments',
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
      setComment('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post comment');
    }
  };

  return (
    <div>
      <h2>Step 5: Comment</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit Comment</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Comment submitted successfully!</p>}
    </div>
  );
};

export default StepFive;
