require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, this is the GPT-Chatbot backend.');
});

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    const helperType = req.body.type;
    const excelVersion = req.body.version;

    try {
        let systemMessage;

        if (helperType === 'excel') {
            systemMessage = `You are an assistant that helps users generate and explain Excel spreadsheet formulas based on their requests. Provide the formula first, followed by an explanation if requested.`;
        } else if (helperType === 'sql') {
            systemMessage = 'You are an assistant that helps users generate and explain SQL queries based on their requests. Provide the query first, followed by an explanation if requested.';
        } else {
            res.status(400).json({ error: 'Invalid helper type. Must be either "excel" or "sql".' });
            return;
        }

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemMessage },
                    { role: 'user', content: userMessage }
                ],
                max_tokens: 200,
                temperature: 0.5,  // Lower temperature for more deterministic responses
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        );

        const botMessage = response.data.choices[0].message.content.trim();
        res.json({ message: botMessage });
    } catch (error) {
        console.error('Error processing request:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
            console.error('Data:', error.response.data);
        }

        let errorMessage = 'Error processing request';
        if (error.response && error.response.data.error && error.response.data.error.code === 'insufficient_quota') {
            errorMessage = 'You have exceeded your quota. Please check your plan and billing details.';
        }

        res.status(500).json({ error: errorMessage, details: error.response ? error.response.data : error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
