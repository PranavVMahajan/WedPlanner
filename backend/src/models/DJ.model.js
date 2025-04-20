const mongoose = require("mongoose");

const DJSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  shortDescription: { type: String, required: true, maxlength: 150 },
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("DJ", DJSchema);
