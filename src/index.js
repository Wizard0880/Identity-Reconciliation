const express = require('express');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());

connectDB();

app.use('/', contactRoutes);

app.get('/', (req, res) => {
  res.send(`
    <h2>Server is Running</h2>
    <p>Listening on port ${process.env.PORT || 3000}</p>
  `);
});


app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
