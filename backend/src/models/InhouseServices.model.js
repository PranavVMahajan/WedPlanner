const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Service", serviceSchema);
