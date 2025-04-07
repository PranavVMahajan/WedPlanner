// src/pages/ServicePage/DecorationList.tsx
import { Link } from "react-router-dom";

const decorators = [
  {
    id: "floral-dreams",
    name: "Floral Dreams",
    description: "Elegant floral decorations for dream weddings.",
    image: "https://images.unsplash.com/photo-1735052713313-40c183b5e4cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "royal-touch",
    name: "Royal Touch Decor",
    description: "Royal-themed stage and venue decor.",
    image: "https://images.unsplash.com/photo-1606293926249-ed22e446d476?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "light-and-lace",
    name: "Light & Lace",
    description: "Whimsical lighting and lace-themed backdrops.",
    image: "https://images.unsplash.com/photo-1544718426-17dea2c0b7ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "modern-aura",
    name: "Modern Aura",
    description: "Minimalist and chic event decor solutions.",
    image: "https://images.unsplash.com/photo-1635349134493-492ca24f2f03?q=80&w=2093&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "rustic-elegance",
    name: "Rustic Elegance",
    description: "Rustic vintage themes with wooden decor.",
    image: "https://images.unsplash.com/photo-1726055532632-d4d34c5233b2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "classic-vibe",
    name: "Classic Vibe Events",
    description: "Timeless wedding decorations with a classic touch.",
    image: "https://images.unsplash.com/photo-1741441029103-97748be1bf39?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
