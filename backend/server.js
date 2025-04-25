const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 4000;
const FILE_PATH = path.join(__dirname, 'outfits.json');

app.use(cors());
app.use(express.json());

const readOutfits = () => {
  if (!fs.existsSync(FILE_PATH)) return [];
  return JSON.parse(fs.readFileSync(FILE_PATH));
};

const writeOutfits = (data) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};

app.get('/api/outfits', (req, res) => {
  res.json(readOutfits());
});

app.post('/api/outfits', (req, res) => {
  const outfit = req.body;
  const data = readOutfits();
  data.push(outfit);
  writeOutfits(data);
  res.json({ message: 'Saved!' });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
