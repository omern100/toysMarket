const express = require('express');
const connectDB = require('./db/mongoConnect');
const userRoutes = require('./routes/usersRoutes');
const toyRoutes = require('./routes/toysRoutes');
const auth = require('./middlewares/auth');
const path = require('path');
require('dotenv').config();


const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRoutes);

app.use('/toys', auth, toyRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('JWT_SECRET:', tokenSec);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1); 
});