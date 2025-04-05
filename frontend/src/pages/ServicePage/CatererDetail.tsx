import { useParams } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const caterers = [
  {
    id: "royal-feast",
    name: "Royal Feast Caterers",
    description: "Lavish menus for royal weddings.",
    images: [
      "https://images.unsplash.com/photo-1604909053195-74e0497b1b3f",
      "https://images.unsplash.com/photo-1613145998434-c1a2334c30db",
      "https://images.unsplash.com/photo-1589307000270-ccb24650d430",
    ],
    cuisines: ["North Indian", "Mughlai", "Continental"],
    price: "₹1,200 per plate",
    teamSize: "15 staff",
    locations: ["Pune", "Mumbai", "Nagpur"],
    contact: {
      company: "Royal Feast Pvt. Ltd.",
      phone: "+91 9876543210",
      email: "info@royalfeast.in",
      address: "Model Colony, Pune, Maharashtra, India",
    },
  },
  {
    id: "taste-buds",
    name: "Taste Buds Catering",
    description: "Flavors from all over India on one plate.",
    images: [
      "https://images.unsplash.com/photo-1576402187873-efbdd2112b46",
      "https://images.unsplash.com/photo-1572635196237-8b0c6a598b9b",
      "https://images.unsplash.com/photo-1576402188039-bd8a03c7ec73",
    ],
    cuisines: ["South Indian", "Gujarati", "Maharashtrian"],
    price: "₹800 per plate",
    teamSize: "12 staff",
    locations: ["Ahmedabad", "Surat", "Pune"],
    contact: {
      company: "Taste Buds Caterers",
      phone: "+91 8765432109",
      email: "contact@tastebuds.co.in",
      address: "Ellis Bridge, Ahmedabad, Gujarat, India",
    },
  },
  {
    id: "urban-bites",
    name: "Urban Bites",
    description: "Trendy and modern culinary experiences.",
    images: [
      "https://images.unsplash.com/photo-1551218808-94e220e084d2",
      "https://images.unsplash.com/photo-1546069901-eacef0df6022",
      "https://images.unsplash.com/photo-1543353071-873f17a7a088",
    ],
    cuisines: ["Mexican", "Italian", "Chinese Fusion"],
    price: "₹1,500 per plate",
    teamSize: "18 staff",
    locations: ["Delhi", "Gurgaon", "Noida"],
    contact: {
      company: "Urban Bites Co.",
      phone: "+91 9988776655",
      email: "hello@urbanbites.in",
      address: "DLF Phase 3, Gurgaon, Haryana, India",
    },
  },
  {
    id: "grand-banquet",
    name: "Grand Banquet Services",
    description: "Perfect for large and luxurious wedding parties.",
    images: [
      "https://images.unsplash.com/photo-1613145998434-c1a2334c30db",
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      "https://images.unsplash.com/photo-1569058242118-27e6c05d7c6f",
    ],
    cuisines: ["Punjabi", "Awadhi", "Bengali"],
    price: "₹2,000 per plate",
    teamSize: "25 staff",
    locations: ["Lucknow", "Kanpur", "Varanasi"],
    contact: {
      company: "Grand Banquet Pvt Ltd.",
      phone: "+91 8888888888",
      email: "info@grandbanquet.com",
      address: "Hazratganj, Lucknow, Uttar Pradesh, India",
    },
  },
  {
    id: "flavor-fiesta",
    name: "Flavor Fiesta",
    description: "Fusion food and artistic presentation.",
    images: [
      "https://images.unsplash.com/photo-1625940846150-c7c9b3897c67",
      "https://images.unsplash.com/photo-1547592180-6515026c3a79",
      "https://images.unsplash.com/photo-1536520002442-ea6bdb5fdb0f",
    ],
    cuisines: ["Fusion", "Thai", "Korean BBQ"],
    price: "₹1,800 per plate",
    teamSize: "20 staff",
    locations: ["Hyderabad", "Chennai", "Bangalore"],
    contact: {
      company: "Fiesta Foods",
      phone: "+91 9123456789",
      email: "flavor@fiesta.com",
      address: "Banjara Hills, Hyderabad, Telangana, India",
    },
  },
  {
    id: "heritage-thali",
    name: "Heritage Thali",
    description: "Authentic Indian regional thalis with tradition.",
    images: [
      "https://images.unsplash.com/photo-1589307000270-ccb24650d430",
      "https://images.unsplash.com/photo-1601312373696-74f99c8460c1",
      "https://images.unsplash.com/photo-1605478371268-6e181ecd2358",
    ],
    cuisines: ["Rajasthani", "South Indian", "Maharashtrian"],
    price: "₹900 per plate",
    teamSize: "10 staff",
    locations: ["Jaipur", "Kolhapur", "Kochi"],
    contact: {
      company: "Heritage Thali Co.",
      phone: "+91 9345678901",
      email: "info@heritagethali.in",
      address: "Pink City, Jaipur, Rajasthan, India",
    },
  },
];

const CatererDetail = () => {
  const { id } = useParams<{ id: string }>();
  const caterer = caterers.find((c) => c.id === id);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % caterer!.images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + caterer!.images.length) % caterer!.images.length);

  if (!caterer) {
    return <div className="p-4 text-red-500">Caterer not found!</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Image Slider */}
      <div className="relative w-full h-[300px] sm:h-[450px] rounded-xl overflow-hidden shadow-lg">
        <img
          src={caterer.images[currentIndex]}
          alt={`Gallery Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition duration-500"
        />
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Service Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-primary">{caterer.name}</h2>
          <p className="text-gray-600 text-base">{caterer.description}</p>

          <div className="flex flex-wrap gap-2">
            {caterer.cuisines.map((cuisine, idx) => (
              <span
                key={idx}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {cuisine}
              </span>
            ))}
          </div>

          <div className="text-sm text-gray-700 space-y-2 pt-4">
            <p><strong>Price:</strong> {caterer.price}</p>
            <p><strong>Team Size:</strong> {caterer.teamSize}</p>
            <p><strong>Locations Available:</strong> {caterer.locations.join(", ")}</p>
          </div>

          <button className="mt-4 bg-primary text-white px-6 py-2 rounded-xl shadow hover:bg-primary/90 transition duration-300">
            Confirm Booking
          </button>
        </div>

        <div className="bg-gray-100 rounded-xl p-6 shadow space-y-4">
          <h3 className="text-xl font-semibold">Contact Information</h3>
          <p><strong>Company:</strong> {caterer.contact.company}</p>
          <p><strong>Phone:</strong> {caterer.contact.phone}</p>
          <p><strong>Email:</strong> {caterer.contact.email}</p>
          <p><strong>Address:</strong> {caterer.contact.address}</p>
        </div>
      </div>
    </div>
  );
};

export default CatererDetail;
