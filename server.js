const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Send index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'index.html'));
});

// Endpoint to handle form submission
app.post('/send-message', async (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received message:', { name, email, message });

    const smsText = `New message from ${name} (${email}): ${message}`;
    // Replace with the recipient's phone number
    const to = '+491748080008'; 
    const apiKey = "I482BQDi9FpHFeoElj4Mk0DJj0DwdYbFqnPZmKpwoy4G9ungso9IIGwogSNJAbLf";

    const params = new URLSearchParams();
    params.append("to", to);
    params.append("text", smsText);
    params.append("from", "Hengameh");
    params.append('p', apiKey);

    try {
        const sevenResponse = await axios.post("https://gateway.seven.io/api/sms", params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        console.log('SMS sent successfully:', sevenResponse.data);
        res.json({ success: true, message: 'Message received successfully!' });
    } catch (error) {
        console.error('Error sending SMS:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
