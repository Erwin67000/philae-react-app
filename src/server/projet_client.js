// src/server/index.js (ou server.js)
const express = require('express');
const cors = require('cors');
const path = require('path');
const { processClientProject } = require('./projet_client'); // Ajuste le chemin

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Pour que React (port 3000) appelle le backend (5000)
app.use(express.json()); // Pour parser JSON dans les req

// Endpoint pour générer devis/plan/email
app.post('/api/generate-devis', async (req, res) => {
  try {
    const params = req.body;
    const result = await processClientProject(params);
    res.json({ success: true, message: result });
  } catch (error) {
    console.error('Erreur backend:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Serve les fichiers statiques React en prod (optionnel pour dev)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Backend Philae Design sur http://localhost:${PORT}`);
});