const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// DHIS2 API Configuration (stored in environment variables for security)
const DHIS2_BASE_URL = process.env.DHIS2_BASE_URL; // e.g., https://<your-dhis2-instance-url>/api
const DHIS2_USERNAME = process.env.DHIS2_USERNAME;
const DHIS2_PASSWORD = process.env.DHIS2_PASSWORD;

// Helper function to send SMS via DHIS2
const sendSmsViaDHIS2 = async (phoneNumber, message) => {
    try {
        const response = await axios.post(
            `${DHIS2_BASE_URL}/sms/outbound`,
            {
                message, // Message content
                recipients: [phoneNumber], // Recipient phone number
            },
            {
                auth: {
                    username: DHIS2_USERNAME,
                    password: DHIS2_PASSWORD,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending SMS:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to send SMS');
    }
};

// API Endpoint to handle SMS requests
app.post('/api/sms/send', async (req, res) => {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
        return res.status(400).json({ error: 'Phone number and message are required' });
    }

    try {
        const result = await sendSmsViaDHIS2(phoneNumber, message);
        res.status(200).json({ message: 'SMS sent successfully!', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
