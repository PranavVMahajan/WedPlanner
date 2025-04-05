import { useParams } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather"; // Ensure you have react-feather installed

// Sample data for photographers
const photographers = [
    {
      id: "pixel-studio",
      name: "Pixel Studio",
      description: "Creative photography for weddings & events.",
      images: [
        "https://images.unsplash.com/photo-1542315192-1a66b6a5c4b5",
        "https://images.unsplash.com/photo-1552152370-fb05b25ff17b",
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      ],
      services: ["Weddings", "Events", "Portraits"],
      quotation: "₹20,000 per day",
      teamSize: "5 members",
      locations: ["Pune", "Mumbai", "Nashik"],
      contact: {
        company: "Pixel Studio Pvt. Ltd.",
        phone: "+91 9420322704",
        email: "contact@pixelstudio.com",
        address: "Kalewadi, Pune, Maharashtra, India",
      },
    },
    {
      id: "light-capture",
      name: "Light Capture Studio",
      description: "Modern and stylish wedding captures.",
      images: [
        "https://images.unsplash.com/photo-1520639888714-7b11140c2592",
        "https://images.unsplash.com/photo-1590080876094-30ecdc9b06c4",
        "https://images.unsplash.com/photo-1574158622682-e40e69881006",
      ],
      services: ["Weddings", "Fashion", "Cinematic"],
      quotation: "₹18,500 per day",
      teamSize: "6 members",
      locations: ["Pune", "Nagpur", "Lonavala"],
      contact: {
        company: "Light Capture Studios",
        phone: "+91 9823012345",
        email: "info@lightcapture.in",
        address: "JM Road, Pune, Maharashtra, India",
      },
    },
    {
      id: "flashframe",
      name: "FlashFrame Studio",
      description: "Elegant moments with every click.",
      images: [
        "https://images.unsplash.com/photo-1530023367847-a683933f417a",
        "https://images.unsplash.com/photo-1541417904950-b855846fe074",
        "https://images.unsplash.com/photo-1532619187608-e5375cab36f3",
      ],
      services: ["Weddings", "Engagements", "Corporate"],
      quotation: "₹22,000 per day",
      teamSize: "4 members",
      locations: ["Mumbai", "Pune", "Goa"],
      contact: {
        company: "FlashFrame Creations",
        phone: "+91 9765123456",
        email: "hello@flashframe.com",
        address: "Andheri West, Mumbai, Maharashtra, India",
      },
    },
    {
      id: "lens-art",
      name: "LensArt Photography",
      description: "Bringing your wedding story to life.",
      images: [
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
        "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
      ],
      services: ["Weddings", "Pre-Weddings", "Drone Shoots"],
      quotation: "₹25,000 per day",
      teamSize: "7 members",
      locations: ["Nashik", "Pune", "Aurangabad"],
      contact: {
        company: "LensArt Visuals",
        phone: "+91 9988776655",
        email: "support@lensart.com",
        address: "College Road, Nashik, Maharashtra, India",
      },
    },
    {
      id: "clicks-and-smiles",
      name: "Clicks & Smiles",
      description: "Candid wedding moments beautifully captured.",
      images: [
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
        "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
        "https://images.unsplash.com/photo-1525163249096-b399effeacc1",
      ],
      services: ["Weddings", "Kids", "Family Portraits"],
      quotation: "₹15,000 per day",
      teamSize: "3 members",
      locations: ["Nagpur", "Pune", "Ahmednagar"],
      contact: {
        company: "Clicks & Smiles LLP",
        phone: "+91 9090909090",
        email: "book@clicksnsmiles.com",
        address: "Dharampeth, Nagpur, Maharashtra, India",
      },
    },
    {
      id: "dreamshots",
      name: "DreamShots Studio",
      description: "Turning dreams into frames.",
      images: [
        "https://images.unsplash.com/photo-1582719478148-97053855234c",
        "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb",
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      ],
      services: ["Weddings", "Fashion", "Commercial"],
      quotation: "₹30,000 per day",
      teamSize: "8 members",
      locations: ["Pune", "Mumbai", "Bangalore"],
      contact: {
        company: "DreamShots Pvt. Ltd.",
        phone: "+91 9004567890",
        email: "shoot@dreamshots.in",
        address: "Baner, Pune, Maharashtra, India",
      },
    },
  ];
  

const PhotographerDetail = () => {
  const { photographerId } = useParams<{ photographerId: string }>();
  const photographer = photographers.find((p) => p.id === photographerId);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photographer) {
    return <div>Photographer not found</div>;
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photographer.images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photographer.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Image Slider */}
      <div className="relative w-full h-[300px] sm:h-[450px] rounded-xl overflow-hidden shadow-lg">
        <img
          src={photographer.images[currentIndex]}
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
        {/* Left Info */}
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-primary">{photographer.name}</h2>
          <p className="text-gray-600 text-base">{photographer.description}</p>

          {/* Service Tags */}
          <div className="flex flex-wrap gap-2">
            {photographer.services.map((service, idx) => (
              <span
                key={idx}
                className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {service}
              </span>
            ))}
          </div>

          {/* Info */}
          <div className="text-sm text-gray-700 space-y-2 pt-4">
            <p>
              <strong>Quotation:</strong> {photographer.quotation}
            </p>
            <p>
              <strong>Team Size:</strong> {photographer.teamSize}
            </p>
            <p>
              <strong>Locations Available:</strong> {photographer.locations.join(", ")}
            </p>
          </div>

          {/* Booking Button */}
          <button className="mt-4 bg-primary text-white px-6 py-2 rounded-xl shadow hover:bg-primary/90 transition duration-300">
            Confirm Booking
          </button>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-100 rounded-xl p-6 shadow space-y-4">
          <h3 className="text-xl font-semibold">Contact Information</h3>
          <p>
            <strong>Company:</strong> {photographer.contact.company}
          </p>
          <p>
            <strong>Phone:</strong> {photographer.contact.phone}
          </p>
          <p>
            <strong>Email:</strong> {photographer.contact.email}
          </p>
          <p>
            <strong>Address:</strong> {photographer.contact.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotographerDetail;
