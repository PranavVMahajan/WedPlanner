const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  company: String,
  phone: String,
  email: String,
  address: String,
}, { _id: false });

const photographerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  description: String,
  images: [String],
  services: [String],
  quotation: String,
  teamSize: String,
  locations: [String],
  contact: contactSchema,
});

module.exports = mongoose.model('Photographer', photographerSchema);
