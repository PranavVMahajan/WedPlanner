import { useParams } from "react-router-dom";
import { useState } from "react";

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
    image: "https://images.unsplash.com/photo-1735052713313-40c183b5e4cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Elegant floral decorations with beautiful arrangements for a dream wedding setting.",
    services: ["Stage Decoration", "Table Centerpieces", "Entrance Floral Arches"],
    price: "From ₹30,000",
    contact: "contact@floraldreams.com",
  },
  "royal-touch": {
    name: "Royal Touch Decor",
    image: "https://images.unsplash.com/photo-1606293926249-ed22e446d476?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Grand and royal-themed decorations to give your wedding a majestic feel.",
    services: ["Royal Stage Setup", "Throne Chairs", "Golden Drapes"],
    price: "From ₹45,000",
    contact: "contact@royaltouch.com",
  },
  "light-and-lace": {
    name: "Light & Lace",
    image: "https://images.unsplash.com/photo-1544718426-17dea2c0b7ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Soft lighting and lacy details for a romantic wedding vibe.",
    services: ["Fairy Light Curtains", "Lace Tents", "Chandelier Decor"],
    price: "From ₹25,000",
    contact: "info@lightandlace.in",
  },
  "modern-aura": {
    name: "Modern Aura",
    image: "https://images.unsplash.com/photo-1635349134493-492ca24f2f03?q=80&w=2093&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Minimalist and modern decoration concepts with clean aesthetics.",
    services: ["Geometric Backdrops", "LED Installations", "Contemporary Florals"],
    price: "From ₹40,000",
    contact: "hello@modernaura.in",
  },
  "rustic-elegance": {
    name: "Rustic Elegance",
    image: "https://images.unsplash.com/photo-1726055532632-d4d34c5233b2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Rustic wooden themes with vintage charm.",
    services: ["Barn Style Decor", "Wooden Props", "Rustic Floral Jars"],
    price: "From ₹28,000",
    contact: "rustic@eleganceweddings.com",
  },
  "classic-vibe": {
    name: "Classic Vibe Events",
    image: "https://images.unsplash.com/photo-1741441029103-97748be1bf39?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Elegant and timeless decoration styles.",
    services: ["Red Carpet Entry", "Classic Stage", "Vintage Centerpieces"],
    price: "From ₹35,000",
    contact: "classicvibe@decorators.in",
  },
};

const DecorationDetail = () => {
    const { id } = useParams<{ id: string }>();
    const decorator = id ? decoratorData[id] : null;
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      budget: "",
      days: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Booking data submitted:", formData);
      setIsModalOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        budget: "",
        days: "",
      });
      // Add toast or API integration here
    };
  
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
  
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-primary text-white px-6 py-2 rounded-xl shadow hover:bg-primary/90 transition duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
  
        {/* Booking Modal */}
        {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-xl relative">
            {/* Close button */}
            <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold focus:outline-none"
                aria-label="Close modal"
            >
                &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">
                Book {decorator.name}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Estimated Budget (₹)"
                required
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                <input
                type="number"
                name="days"
                value={formData.days}
                onChange={handleChange}
                placeholder="Number of Days Needed"
                required
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />

                <div className="flex justify-end pt-2">
                <button
                    type="submit"
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200"
                >
                    Confirm Booking
                </button>
                </div>
            </form>
            </div>
        </div>
        )}

      </div>
    );
  };
  
  export default DecorationDetail;