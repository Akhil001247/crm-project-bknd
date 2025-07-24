const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();


app.use(cors({
  origin: ['http://localhost:5173'], 
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
