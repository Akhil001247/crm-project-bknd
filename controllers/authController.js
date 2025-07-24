const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash });
    res.status(201).json({ msg: 'User Registered' });
  } catch (err) {
    console.error("Register Error:", err);  
    res.status(400).json({ error: 'Registration Failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid Credentials' });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
    res.json({ token, username: user.username });
  } catch {
    res.status(500).json({ error: 'Server Error' });
  }
};
