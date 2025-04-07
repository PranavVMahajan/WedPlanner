import { useParams } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight,X } from "react-feather"; // Ensure you have react-feather installed

// Sample data for photographers
const photographers = [
    {
      id: "pixel-studio",
      name: "Pixel Studio",
      description: "Creative photography for weddings & events.",
      images: [
        "https://images.unsplash.com/photo-1583878545126-2f1ca0142714?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        "https://images.unsplash.com/photo-1647949940712-bfcf82015d9b?q=80&w=2025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        "https://images.unsplash.com/photo-1583878544826-8f8c418033ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        "https://images.unsplash.com/photo-1587271511223-18b7ef9a327a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        "https://images.unsplash.com/photo-1735052709798-2abcc8c0d6e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      eventType: "",
      location: "",
      budget: "",
    });
  
    if (!photographer) return <div>Photographer not found</div>;
  
    const prevImage = () => {
      setCurrentIndex((prev) => (prev === 0 ? photographer.images.length - 1 : prev - 1));
    };
  
    const nextImage = () => {
      setCurrentIndex((prev) => (prev === photographer.images.length - 1 ? 0 : prev + 1));
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Booking Submitted:", formData);
      alert("Booking submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        eventType: "",
        location: "",
        budget: "",
      });
      setShowBookingForm(false);
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
  
        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side */}
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-primary">{photographer.name}</h2>
            <p className="text-gray-600 text-base">{photographer.description}</p>
  
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
            <button
              className="mt-4 bg-primary text-white px-6 py-2 rounded-xl shadow hover:bg-primary/90 transition duration-300"
              onClick={() => setShowBookingForm(true)}
            >
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
  
        {/* Booking Modal Overlay */}
        {showBookingForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-8 w-full max-w-2xl relative shadow-lg">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
                onClick={() => setShowBookingForm(false)}
              >
                <X size={24} />
              </button>
  
              <h2 className="text-2xl font-bold mb-6 text-center">Booking Form</h2>
  
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="border px-4 py-2 rounded-md"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    required
                    className="border px-4 py-2 rounded-md"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                    className="border px-4 py-2 rounded-md"
                  />
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="border px-4 py-2 rounded-md"
                  >
                    <option value="">Type of Event</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Pre-Wedding">Pre-Wedding</option>
                    <option value="Reception">Reception</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Event Location"
                    required
                    className="border px-4 py-2 rounded-md"
                  />
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="Your Budget (e.g. ₹20,000)"
                    required
                    className="border px-4 py-2 rounded-md"
                  />
                </div>
  
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Submit Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default PhotographerDetail;