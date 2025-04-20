import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "react-feather";
import axios from "axios";

interface Photographer {
  _id: string;
  id: string;
  name: string;
  description: string;
  images: string[];
  services: string[];
  quotation: string;
  teamSize: string;
  locations: string[];
  contact: {
    company: string;
    phone: string;
    email: string;
    address: string;
  };
}

const PhotographerDetail = () => {
  const { photographerId } = useParams<{ photographerId: string }>();
  const [photographer, setPhotographer] = useState<Photographer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First get all photographers to find the matching photographer
        const allResponse = await axios.get(
          "http://localhost:1213/api/inhouseServices/photographers"
        );
        
        // Find photographer by either id (pixel-studio) or _id
        const found = allResponse.data.find((p: Photographer) => 
          p.id === photographerId || p._id === photographerId
        );
        
        if (!found) {
          throw new Error("Photographer not found");
        }

        // If we found by id (pixel-studio), fetch details using _id
        if (found.id === photographerId) {
          const detailResponse = await axios.get(
            `http://localhost:1213/api/inhouseServices/photographers/${found._id}`
          );
          setPhotographer(detailResponse.data);
        } else {
          // We already have the full details
          setPhotographer(found);
        }
        
      } catch (err) {
        console.error("Error fetching photographer:");
        setError("Failed to load photographer details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (photographerId) {
      fetchPhotographer();
    } else {
      setError("Invalid photographer ID");
      setLoading(false);
    }
  }, [photographerId]);

  const prevImage = () => {
    if (photographer) {
      setCurrentIndex((prev) =>
        prev === 0 ? photographer.images.length - 1 : prev - 1
      );
    }
  };

  const nextImage = () => {
    if (photographer) {
      setCurrentIndex((prev) =>
        prev === photographer.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-2">Loading photographer details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center py-20 text-red-500">
          <p className="text-xl font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!photographer) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center py-20">
          <p className="text-xl">Photographer not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Image Slider */}
      <div className="relative w-full h-[300px] sm:h-[450px] rounded-xl overflow-hidden shadow-lg">
        <img
          src={photographer.images[currentIndex]}
          alt={`${photographer.name} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x400?text=Image+Not+Available";
          }}
        />
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow transition"
          aria-label="Previous image"
        >
          <ChevronLeft className="text-gray-800" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow transition"
          aria-label="Next image"
        >
          <ChevronRight className="text-gray-800" />
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

          <button
            className="mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl shadow transition"
            onClick={() => setShowBookingForm(true)}
          >
            Confirm Booking
          </button>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-xl p-6 shadow space-y-4">
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
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
              onClick={() => setShowBookingForm(false)}
              aria-label="Close booking form"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">Booking Form</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    required
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Event Type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Pre-Wedding">Pre-Wedding</option>
                    <option value="Reception">Reception</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Event Location"
                    required
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="Your Budget (e.g. ₹20,000)"
                    required
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
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