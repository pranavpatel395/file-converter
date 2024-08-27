const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', routes); // Make sure this line is present

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
