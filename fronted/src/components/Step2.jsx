import React, { useState } from 'react';
import axios from '../services/api';

function Step2() {
  const [code, setCode] = useState('');
  const [isResent, setIsResent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem("email")
      const response = await axios.post('/api/auth/verify-email', { code, email });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleResend = async () => {
    try {
      const email = localStorage.getItem("email")
      const response = await axios.post('/api/auth/resend-code', { email });
      setIsResent(true);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Step 2: Verify Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
      <button onClick={handleResend}> {!isResent ? 'Send Code' : 'Resend Code'} </button>
      {isResent && <p>Verification code resent!</p>}
    </div>
  );
}

export default Step2;
