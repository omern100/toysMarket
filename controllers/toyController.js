const Toy = require('../models/Toys');

exports.getAllToys = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    
    const toys = await Toy.find().skip(skip).limit(limit);
    res.json(toys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchToys = async (req, res) => {
  try {
    const search = req.query.s || '';
    const skip = parseInt(req.query.skip) || 0;
    const limit = 10;

    const toys = await Toy.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { info: { $regex: search, $options: 'i' } }
      ]
    }).skip(skip).limit(limit);
    res.json(toys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getToysByCategory = async (req, res) => {
  try {
    const { catname } = req.params;
    const skip = parseInt(req.query.skip) || 0;
    const limit = 10;

    const toys = await Toy.find({ category: catname }).skip(skip).limit(limit);
    res.json(toys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createToy = async (req, res) => {
  try {
    const newToy = new Toy({
      ...req.body,
      user_id: req.user.userId
    });
    const savedToy = await newToy.save();
    res.status(201).json(savedToy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateToy = async (req, res) => {
  try {
    const toy = await Toy.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!toy) return res.status(404).json({ message: 'Toy not found or you do not have permission' });
    res.json(toy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteToy = async (req, res) => {
  try {
    const toy = await Toy.findOneAndDelete({ _id: req.params.id, user_id: req.user.userId }); // חלק 2: בדיקת הבעלות
    if (!toy) return res.status(404).json({ message: 'Toy not found or you do not have permission' });
    res.json({ message: 'Toy deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getToysByPriceRange = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const min = parseFloat(req.query.min) || 0;
    const max = parseFloat(req.query.max) || Infinity;

    const toys = await Toy.find({ price: { $gte: min, $lte: max } }).skip(skip).limit(10);
    res.json(toys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSingleToy = async (req, res) => {
  try {
    const toy = await Toy.findById(req.params.id);
    if (!toy) return res.status(404).json({ message: 'Toy not found' });
    res.json(toy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getToysCount = async (req, res) => {
  try {
    const count = await Toy.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};