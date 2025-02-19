const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ message: 'Email already exists' });

    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email.' });
    
    console.log('Input password:', password);
    console.log('Stored password:', user.password);
    
    const validPassword = await user.comparePassword(password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password.' });

 
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }
    
    const users = await User.find({}, { password: 0 }); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};