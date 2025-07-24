const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();


app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://crm-project-frnd-w52h.vercel.app',
    'https://crm-project-frnd-ashh.vercel.app'
  ],
  credentials: true
}));


app.use(express.json());


app.get('/', (req, res) => {
  res.send('API is running...');
});


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error(' MongoDB connection error:', err));


app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server started on port ${PORT}`));
