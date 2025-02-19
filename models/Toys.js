const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
  },
  info: String,
  category: String,
  img_url: String,
  price: {
    type: Number,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: String,
    required: true
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Toy', toySchema);