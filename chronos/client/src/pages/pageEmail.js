import React, { useState } from 'react';
import axios from 'axios';
import ChronosInput from '../components/ChronosInput';
import ChronosButton from '../components/ChronosButton';
import "../css/styleMail.css"
import send from "../images/send.png";
import ToggleButton from '../components/ToggleButton';

const PageEmail = () => {
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
        
        // Handle success, e.g., show a success message to the user
        } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message to the user
        }
    };

  return (
    <div className='emailFormCont'>
        <div className='emailFormTitle'>
            <h2>Envoyer un mail</h2>
            <ToggleButton color="#000" src={send} action={handleSendEmail} text="Envoyer" />
        </div>

        <div className='emailForm'>
            <div className='emailInputCont'>
                <label>
                    À:
                </label>
                <input className='emailInput' type="email" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} />
            </div>

            <div className='emailInputCont'>
                <label>
                    Objet:
                </label>
                <input className='emailTextInput' type="text"  value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>

            <div className='emailInputCont'>
                <label>
                    Message:
                </label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
        </div>
    </div>
  )
}

export default PageEmail
