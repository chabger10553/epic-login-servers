const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// CORS für ALLE Domains erlauben
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Requested-With']
}));

app.use(express.json());

// Epic Games Login Proxy
app.post('/api/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body.email);
    
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
    console.log('Epic response:', data);
    
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server läuft auf Port 3000'));
