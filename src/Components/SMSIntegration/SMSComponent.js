import React, { useState } from 'react';
import './SMSComponent.css';  // Importing the CSS file

const SMSComponent = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSendSMS = async (e) => {
        e.preventDefault();

        // Call backend API to send SMS
        try {
            const response = await fetch('/api/sms/send', {  // Adjust endpoint to match your backend
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber, message })
            });
            const result = await response.json();
            
            if (response.ok) {
                setStatus('SMS sent successfully!');
            } else {
                setStatus(`Failed to send SMS: ${result.error}`);
            }
        } catch (error) {
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
