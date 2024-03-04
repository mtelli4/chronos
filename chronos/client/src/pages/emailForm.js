import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send_email', {
        recipient_email: recipientEmail,
        subject: subject,
        message: message,
      });

      console.log(response.data);
      // Handle success, e.g., show a success message to the user
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h1>Email Form</h1>
      <label>
        Recipient Email:
        <input type="email" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Subject:
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </label>
      <br />
      <label>
        Message:
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSendEmail}>Send Email</button>
    </div>
  );
};

export default EmailForm;
