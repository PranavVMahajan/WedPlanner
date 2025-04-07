// src/pages/ServicePage/MehendiList.tsx
import { Link } from "react-router-dom";

const mehendiArtists = [
  {
    id: "henna-hues",
    name: "Henna Hues",
    description: "Traditional and contemporary mehendi artistry.",
    image: "https://images.unsplash.com/photo-1556536088-f010a312a8d3?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "mehendi-magic",
    name: "Mehendi Magic",
    description: "Elegant bridal mehendi with intricate patterns.",
    image: "https://images.unsplash.com/photo-1554787388-9194e4eb57a3?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "artistic-henna",
    name: "Artistic Henna",
    description: "Custom designs with natural organic paste.",
    image: "https://images.unsplash.com/photo-1730003873829-09b4b16444c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "royal-mehendi",
    name: "Royal Henna Art",
    description: "Royal mehendi styles for regal brides.",
    image: "https://images.unsplash.com/photo-1619734089700-842e56497353?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "delicate-designs",
    name: "Delicate Designs",
    description: "Subtle and elegant designs for intimate weddings.",
    image: "https://images.unsplash.com/photo-1613665667184-81bb9b8605e2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "fusion-fingers",
    name: "Fusion Fingers",
    description: "Fusion of traditional and modern mehendi patterns.",
    image: "https://images.unsplash.com/photo-1563299182-246a920b4021?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
