const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  company: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
});

const mehendiArtistSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // e.g., "henna-hues"
    name: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }], // Array of image URLs
    priceRange: { type: String }, // e.g., "₹2,000 - ₹10,000"
    teamSize: { type: String }, // e.g., "5 artists"
    locations: [{ type: String }], // e.g., ["Mumbai", "Nashik"]
    contact: { type: contactSchema, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("MehendiArtist", mehendiArtistSchema);
