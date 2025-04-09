const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  company: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
});

const catererSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // e.g., "royal-feast"
    name: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }], // array of image URLs
    cuisines: [{ type: String }], // array of cuisines offered
    price: { type: String }, // e.g., "₹1,200 per plate"
    teamSize: { type: String }, // e.g., "15 staff"
    locations: [{ type: String }], // array of cities
    contact: { type: contactSchema, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Caterer", catererSchema);
