const mongoose = require("mongoose");

const galleryImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
    },
    tags: [
      {
        type: String,
      }
    ]
  },
  {
    timestamps: true,
  }
);

const GalleryImage = mongoose.model("GalleryImage", galleryImageSchema);
module.exports = GalleryImage;
