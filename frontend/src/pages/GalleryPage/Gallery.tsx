

const galleryImages = [
  {
    url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg",
    location: "Beach Wedding in Goa, India",
  },
  {
    url: "https://images.pexels.com/photos/169189/pexels-photo-169189.jpeg",
    location: "Rustic Wedding in Udaipur, Rajasthan",
  },
  {
    url: "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg",
    location: "Garden Wedding in Bangalore, Karnataka",
  },
  {
    url: "https://images.pexels.com/photos/302051/pexels-photo-302051.jpeg",
    location: "Hillside Wedding in Mussoorie, Uttarakhand",
  },
  {
    url: "https://images.pexels.com/photos/212236/pexels-photo-212236.jpeg",
    location: "Royal Wedding in Jaipur, Rajasthan",
  },
  {
    url: "https://images.pexels.com/photos/1128782/pexels-photo-1128782.jpeg",
    location: "City Wedding in Mumbai, Maharashtra",
  },
];

const Gallery = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">
        Wedding Moments Gallery
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white"
          >
            <img
              src={img.url}
              alt={`Wedding ${index + 1}`}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <p className="text-sm text-gray-700 font-medium">{img.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
