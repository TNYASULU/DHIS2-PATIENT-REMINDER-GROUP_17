const express = require('express');
const { Vonage } = require('@vonage/server-sdk');

const app = express();
app.use(express.json());

require('dotenv').config();

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

// SMS Sending Endpoint
app.post('/api/sms/send', async (req, res) => {
  const { phoneNumber, message } = req.body;

  try {
    const from = "VonageAPI"; // This is overridden by Vonage on trial accounts
    const to = phoneNumber;
    const text = message;

    const response = await vonage.sms.send({ to, from, text });

    if (response.messages[0].status === '0') {
      res.status(200).json({ success: true, message: 'SMS sent successfully!' });
    } else {
      res.status(400).json({ success: false, error: response.messages[0]['error-text'] });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
