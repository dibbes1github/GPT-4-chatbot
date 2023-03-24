const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});