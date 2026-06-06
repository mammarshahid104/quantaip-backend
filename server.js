const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const reviewRoutes = require('./routes/reviews');
const contactRoutes = require('./routes/contacts');

app.use('/api/reviews', reviewRoutes);
app.use('/api/contacts', contactRoutes);

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4,
  directConnection: false
})
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log('DB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`QUANTAIP Backend running on port ${PORT}`);
});