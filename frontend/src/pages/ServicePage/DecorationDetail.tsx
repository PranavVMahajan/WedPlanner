import { useParams } from "react-router-dom";

type Decorator = {
  name: string;
  image: string;
  description: string;
  services: string[];
  price: string;
  contact: string;
};

const decoratorData: Record<string, Decorator> = {
  "floral-dreams": {
    name: "Floral Dreams",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f13931385",
    description: "Elegant floral decorations with beautiful arrangements for a dream wedding setting.",
    services: ["Stage Decoration", "Table Centerpieces", "Entrance Floral Arches"],
    price: "From ₹30,000",
    contact: "contact@floraldreams.com",
  },
  "royal-touch": {
    name: "Royal Touch Decor",
    image: "https://images.unsplash.com/photo-1581092334440-1dcdb3cf61b3",
    description: "Grand and royal-themed decorations to give your wedding a majestic feel.",
    services: ["Royal Stage Setup", "Throne Chairs", "Golden Drapes"],
    price: "From ₹45,000",
    contact: "contact@royaltouch.com",
  },
  "light-and-lace": {
    name: "Light & Lace",
    image: "https://images.unsplash.com/photo-1583278853656-01fd3c482675",
    description: "Soft lighting and lacy details for a romantic wedding vibe.",
    services: ["Fairy Light Curtains", "Lace Tents", "Chandelier Decor"],
    price: "From ₹25,000",
    contact: "info@lightandlace.in",
  },
  "modern-aura": {
    name: "Modern Aura",
    image: "https://images.unsplash.com/photo-1579547945394-08a0f43d3f9e",
    description: "Minimalist and modern decoration concepts with clean aesthetics.",
    services: ["Geometric Backdrops", "LED Installations", "Contemporary Florals"],
    price: "From ₹40,000",
    contact: "hello@modernaura.in",
  },
  "rustic-elegance": {
    name: "Rustic Elegance",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    description: "Rustic wooden themes with vintage charm.",
    services: ["Barn Style Decor", "Wooden Props", "Rustic Floral Jars"],
    price: "From ₹28,000",
    contact: "rustic@eleganceweddings.com",
  },
  "classic-vibe": {
    name: "Classic Vibe Events",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    description: "Elegant and timeless decoration styles.",
    services: ["Red Carpet Entry", "Classic Stage", "Vintage Centerpieces"],
    price: "From ₹35,000",
    contact: "classicvibe@decorators.in",
  },
};

const DecorationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const decorator = id ? decoratorData[id] : null;

  if (!decorator) {
    return (
      <div className="text-center text-red-500 py-20 text-xl">
        Decorator not found!
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Image */}
        <div>
          <img
            src={decorator.image}
            alt={decorator.name}
            className="w-full h-96 object-cover rounded-xl shadow"
          />
        </div>

        {/* Right - Details */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary">{decorator.name}</h1>
          <p className="text-gray-700 text-lg">{decorator.description}</p>

          <div>
            <h2 className="text-xl font-semibold mt-6 mb-2">Services Offered:</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {decorator.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="pt-4 space-y-2">
            <p className="text-lg font-medium text-gray-800">
              Starting Price: {decorator.price}
            </p>
            <p className="text-lg text-gray-700">
              Contact: {decorator.contact}
            </p>
          </div>

          <button className="mt-4 bg-primary text-white px-6 py-2 rounded-xl shadow hover:bg-primary/90 transition duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DecorationDetail;
