// src/pages/ServicePage/MehendiDetail.tsx
import { useParams } from "react-router-dom";

const mehendiArtists = [
    {
      id: "henna-hues",
      name: "Henna Hues",
      description: "Traditional and contemporary mehendi artistry.",
      images: [
        "https://images.unsplash.com/photo-1575202332840-8ecb94f5e2c4",
        "https://images.unsplash.com/photo-1598340730877-23df36b2d6e6",
        "https://images.unsplash.com/photo-1600854103454-e3ee70449fe0",
      ],
      priceRange: "₹2,000 - ₹10,000",
      teamSize: "5 artists",
      locations: ["Mumbai", "Nashik", "Thane"],
      contact: {
        company: "Henna Hues Pvt. Ltd.",
        phone: "+91 7894561230",
        email: "hello@hennahues.in",
        address: "Andheri West, Mumbai, India",
      },
    },
    {
      id: "mehendi-magic",
      name: "Mehendi Magic",
      description: "Elegant bridal mehendi with intricate patterns.",
      images: [
        "https://images.unsplash.com/photo-1632169045912-f831a59b9bb6",
        "https://images.unsplash.com/photo-1603066313566-62b87d35df9a",
        "https://images.unsplash.com/photo-1601394369932-6e3e8fc3f0ab",
      ],
      priceRange: "₹1,500 - ₹8,000",
      teamSize: "4 artists",
      locations: ["Delhi", "Gurgaon", "Noida"],
      contact: {
        company: "Mehendi Magic Studio",
        phone: "+91 9012345678",
        email: "contact@mehendimagic.in",
        address: "Rajouri Garden, Delhi, India",
      },
    },
    {
      id: "artistic-henna",
      name: "Artistic Henna",
      description: "Custom designs with natural organic paste.",
      images: [
        "https://images.unsplash.com/photo-1600854103454-e3ee70449fe0",
        "https://images.unsplash.com/photo-1552037999-36f53b0b54c2",
        "https://images.unsplash.com/photo-1632168720077-fdc3a3b88ee8",
      ],
      priceRange: "₹1,000 - ₹5,000",
      teamSize: "3 artists",
      locations: ["Pune", "Ahmedabad", "Surat"],
      contact: {
        company: "Artistic Henna Co.",
        phone: "+91 9898989898",
        email: "bookings@artisthenna.in",
        address: "FC Road, Pune, Maharashtra, India",
      },
    },
    {
      id: "royal-henna",
      name: "Royal Henna Art",
      description: "Royal mehendi styles for regal brides.",
      images: [
        "https://images.unsplash.com/photo-1505919252683-6c3c79c6e6fb",
        "https://images.unsplash.com/photo-1548281433-2b8f94a7a2a3",
        "https://images.unsplash.com/photo-1601394348743-cdf97e5f4e02",
      ],
      priceRange: "₹2,500 - ₹9,000",
      teamSize: "6 artists",
      locations: ["Jaipur", "Udaipur", "Jodhpur"],
      contact: {
        company: "Royal Henna Artistry",
        phone: "+91 8765432109",
        email: "royalhenna@art.com",
        address: "MI Road, Jaipur, Rajasthan, India",
      },
    },
    {
      id: "delicate-designs",
      name: "Delicate Designs",
      description: "Subtle and elegant designs for intimate weddings.",
      images: [
        "https://images.unsplash.com/photo-1520975922077-317acef9c244",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
        "https://images.unsplash.com/photo-1594041680070-bb81b9e5fd54",
      ],
      priceRange: "₹1,200 - ₹4,500",
      teamSize: "2 artists",
      locations: ["Lucknow", "Kanpur", "Varanasi"],
      contact: {
        company: "Delicate Mehendi Studio",
        phone: "+91 9988776655",
        email: "contact@delicatedesigns.in",
        address: "Hazratganj, Lucknow, India",
      },
    },
    {
      id: "fusion-fingers",
      name: "Fusion Fingers",
      description: "Fusion of traditional and modern mehendi patterns.",
      images: [
        "https://images.unsplash.com/photo-1587213811864-3d26c9530c9f",
        "https://images.unsplash.com/photo-1582892889828-0587eb85c6ec",
        "https://images.unsplash.com/photo-1587314168481-f2b4d7b7e18e",
      ],
      priceRange: "₹2,200 - ₹7,500",
      teamSize: "4 artists",
      locations: ["Bangalore", "Hyderabad", "Chennai"],
      contact: {
        company: "Fusion Fingers Mehendi",
        phone: "+91 9123456780",
        email: "info@fusionfingers.com",
        address: "Koramangala, Bangalore, India",
      },
    },
  ];

const MehendiDetail = () => {
  const { id } = useParams<{ id: string }>();
  const artist = mehendiArtists.find((a) => a.id === id);

  if (!artist) {
    return <div className="p-4 text-red-500">Mehendi artist not found!</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Image Slider */}
      <div className="relative w-full h-[300px] sm:h-[450px] rounded-xl overflow-hidden shadow-lg">
        <img
          src={artist.images[0]}
          alt={`Gallery`}
          className="w-full h-full object-cover transition duration-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-primary">{artist.name}</h2>
          <p className="text-gray-600 text-base">{artist.description}</p>

          <div className="text-sm text-gray-700 space-y-2 pt-4">
            <p><strong>Price Range:</strong> {artist.priceRange}</p>
            <p><strong>Team Size:</strong> {artist.teamSize}</p>
            <p><strong>Locations Available:</strong> {artist.locations.join(", ")}</p>
          </div>

          <button className="mt-4 bg-primary text-white px-6 py-2 rounded-xl shadow hover:bg-primary/90 transition duration-300">
            Book Now
          </button>
        </div>

        <div className="bg-gray-100 rounded-xl p-6 shadow space-y-4">
          <h3 className="text-xl font-semibold">Contact Information</h3>
          <p><strong>Company:</strong> {artist.contact.company}</p>
          <p><strong>Phone:</strong> {artist.contact.phone}</p>
          <p><strong>Email:</strong> {artist.contact.email}</p>
          <p><strong>Address:</strong> {artist.contact.address}</p>
        </div>
      </div>
    </div>
  );
};

export default MehendiDetail;
