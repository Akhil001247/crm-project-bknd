const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();

// ✅ CORS setup for dev + production frontend
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend.vercel.app'], // change this to actual Vercel domain
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
