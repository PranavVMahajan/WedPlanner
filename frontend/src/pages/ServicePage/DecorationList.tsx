// src/pages/ServicePage/DecorationList.tsx
import { Link } from "react-router-dom";

const decorators = [
  {
    id: "floral-dreams",
    name: "Floral Dreams",
    description: "Elegant floral decorations for dream weddings.",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f13931385",
  },
  {
    id: "royal-touch",
    name: "Royal Touch Decor",
    description: "Royal-themed stage and venue decor.",
    image: "https://images.unsplash.com/photo-1581092334440-1dcdb3cf61b3",
  },
  {
    id: "light-and-lace",
    name: "Light & Lace",
    description: "Whimsical lighting and lace-themed backdrops.",
    image: "https://images.unsplash.com/photo-1583278853656-01fd3c482675",
  },
  {
    id: "modern-aura",
    name: "Modern Aura",
    description: "Minimalist and chic event decor solutions.",
    image: "https://images.unsplash.com/photo-1579547945394-08a0f43d3f9e",
  },
  {
    id: "rustic-elegance",
    name: "Rustic Elegance",
    description: "Rustic vintage themes with wooden decor.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  },
  {
    id: "classic-vibe",
    name: "Classic Vibe Events",
    description: "Timeless wedding decorations with a classic touch.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  },
];

const DecorationList = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Wedding Decorators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {decorators.map((decorator) => (
          <Link
            to={`/services/decorations/${decorator.id}`}
            key={decorator.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={decorator.image}
              alt={decorator.name}
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{decorator.name}</h2>
              <p className="text-gray-600">{decorator.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DecorationList;
