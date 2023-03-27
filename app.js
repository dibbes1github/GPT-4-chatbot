require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'text/javascript');
    }
  },
}));

console.log(process.env.OPENAI_API_KEY);

app.post('/api/chatgpt', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `User: ${message}\nChatbot: `,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const chatbotResponse = response.data.choices[0].text.trim();
    res.status(200).json({ response: chatbotResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch ChatGPT response.' });
  }
});

// Updated route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
