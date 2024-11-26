import React, { useState } from 'react';
import './SMSComponent.css';  // Importing the CSS file

const SMSComponent = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSendSMS = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3001/api/sms/send', { // Full backend URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber, message })
            });
    
            if (!response.ok) {
                const errorText = await response.text();  // Read raw response for debugging
                throw new Error(`Failed with status ${response.status}: ${errorText}`);
            }
    
            const result = await response.json();
            setStatus('SMS sent successfully!');
        } catch (error) {
            console.error('Error sending SMS:', error.message);
            setStatus(`Error: ${error.message}`);
        }
    };
    
    return (
        <div className="sms-container">
            <h2>Send SMS</h2>
            <form onSubmit={handleSendSMS}>
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />

                <label>Message:</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <button type="submit">Send SMS</button>
            </form>
            {status && <p className="status">{status}</p>}
        </div>
    );
};

export default SMSComponent;
