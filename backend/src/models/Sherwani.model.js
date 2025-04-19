const mongoose = require('mongoose');

const ShopItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
    enum: ['S', 'M', 'L', 'XL', 'Free Size'], // only allows valid values
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sherwani', ShopItemSchema);
