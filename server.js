const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

// Epic Games Login Proxy
app.post('/api/login', async (req, res) => {
  try {
    const response = await fetch('https://www.epicgames.com/id/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server läuft!'));