// src/server/index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { processClientProject } = require('./projet_client'); // Chemin relatif

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Backend Philae Design sur http://localhost:${PORT}`);
});