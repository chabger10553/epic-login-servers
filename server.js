const express = require('express');
const fetch = require('node-fetch');

const app = express();

// CORS manuell (ohne cors Paket)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://www.epicgames.com',
        'Referer': 'https://www.epicgames.com/id/login'
      },
      body: JSON.stringify(req.body),
      redirect: 'manual'
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
