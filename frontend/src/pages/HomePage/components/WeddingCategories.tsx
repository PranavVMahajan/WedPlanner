import { Link } from "react-router-dom";

const venues = [
  {
    title: "Taj Falaknuma Palace",
    description: "Royal weddings in Hyderabad's historic luxury palace.",
    image:
      "https://images.unsplash.com/photo-1571983371651-221e6c0b910a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bg: "bg-pink-100",
  },
  {
    title: "Umaid Bhawan Palace",
    description: "Regal heritage vibes in Jodhpur’s iconic palace.",
    image:
      "https://images.unsplash.com/photo-1605553426886-c0a99033fda0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bg: "bg-yellow-100",
  },
  {
    title: "City Palace, Udaipur",
    description: "Picturesque lake views and royal ambience.",
    image:
      "https://images.unsplash.com/photo-1562041524-748f3fbde03b?q=80&w=2125&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bg: "bg-purple-100",
  },
  {
    title: "The Leela Palace, Jaipur",
    description: "Luxury and tradition blended beautifully.",
    image:
      "https://images.unsplash.com/photo-1708606811579-23b18fc48007?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bg: "bg-blue-100",
  },
  {
    title: "Neemrana Fort Palace",
    description: "Vintage charm near Delhi for heritage weddings.",
    image:
      "https://images.unsplash.com/photo-1669225445162-beaaa330dc90?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bg: "bg-green-100",
  },
  {
    title: "ITC Grand Bharat, Gurgaon",
    description: "Elegant golf resort with world-class amenities.",
    image:
      "https://images.unsplash.com/photo-1708748144709-651ebdab3f96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bg: "bg-red-100",
  },
  {
    title: "Suryagarh, Jaisalmer",
    description: "Desert palace for fairytale Rajasthani weddings.",
    image:
      "https://images.unsplash.com/photo-1736155983520-a0f7d5949d39?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bg: "bg-orange-100",
  },
  {
    title: "JW Marriott, Mussoorie",
    description: "Romantic Himalayan wedding destination.",
    image:
      "https://images.unsplash.com/photo-1591203281954-23fa2ff8ef18?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bg: "bg-indigo-100",
  },
];

const WeddingCategories = () => {
  return (
    <div className="w-[90%] mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Wedding Venues in India</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {venues.map((venue, i) => (
          <Link
            to={`/venue/${venue.title.replace(/\s+/g, "")}`} // Create URL-friendly route
            key={i}
            className={`rounded-xl overflow-hidden shadow-md flex ${venue.bg} hover:scale-[1.01] transition-transform duration-300`}
          >
            <div className="flex-1 p-5 space-y-2">
              <h2 className="text-2xl font-semibold">{venue.title}</h2>
              <p className="text-gray-700">{venue.description}</p>
            </div>
            <img
              src={venue.image}
              alt={venue.title}
              className="w-45 h-35 object-cover rounded-l-4xl"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WeddingCategories;
