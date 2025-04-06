// src/pages/ServicePage/MehendiList.tsx
import { Link } from "react-router-dom";

const mehendiArtists = [
  {
    id: "henna-hues",
    name: "Henna Hues",
    description: "Traditional and contemporary mehendi artistry.",
    image: "https://images.unsplash.com/photo-1575202332840-8ecb94f5e2c4",
  },
  {
    id: "mehendi-magic",
    name: "Mehendi Magic",
    description: "Elegant bridal mehendi with intricate patterns.",
    image: "https://images.unsplash.com/photo-1632169045912-f831a59b9bb6",
  },
  {
    id: "artistic-henna",
    name: "Artistic Henna",
    description: "Custom designs with natural organic paste.",
    image: "https://images.unsplash.com/photo-1600854103454-e3ee70449fe0",
  },
  {
    id: "royal-henna",
    name: "Royal Henna Art",
    description: "Royal mehendi styles for regal brides.",
    image: "https://images.unsplash.com/photo-1548281433-2b8f94a7a2a3",
  },
  {
    id: "delicate-designs",
    name: "Delicate Designs",
    description: "Subtle and elegant designs for intimate weddings.",
    image: "https://images.unsplash.com/photo-1594041680070-bb81b9e5fd54",
  },
  {
    id: "fusion-fingers",
    name: "Fusion Fingers",
    description: "Fusion of traditional and modern mehendi patterns.",
    image: "https://images.unsplash.com/photo-1587314168481-f2b4d7b7e18e",
  },
];

const MehendiList = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Mehendi Artists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {mehendiArtists.map((artist) => (
          <Link
            to={`/services/mehendi/${artist.id}`}
            key={artist.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{artist.name}</h2>
              <p className="text-gray-600">{artist.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MehendiList;
