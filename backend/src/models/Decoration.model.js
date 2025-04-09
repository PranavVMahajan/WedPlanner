const mongoose = require("mongoose");

const floralDecorationSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true }, // e.g., "floral-dreams"
    name: { type: String, required: true },
    image: { type: String, required: true }, // single image URL
    shortDescription: { type: String }, // brief summary
    description: { type: String }, // detailed description
    services: [{ type: String }], // e.g., ["Stage Decoration", "Table Centerpieces"]
    price: { type: String }, // e.g., "From ₹30,000"
    contact: { type: String, required: true }, // email or phone
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("FloralDecoration", floralDecorationSchema);
