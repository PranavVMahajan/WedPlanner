const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
});

const venueSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true }, // e.g., "taj-falaknuma-palace"
    title: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    cost: { type: String, required: true },
    image: { type: String, required: true },
    bg: { type: String },
    contact: { type: contactSchema, required: true },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Venue", venueSchema);
