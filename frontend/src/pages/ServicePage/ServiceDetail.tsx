import { useParams } from "react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const allServiceData: Record<
  string,
  {
    title: string;
    description: string;
    services: string[];
    images: string[];
    quotation: string;
    teamSize: string;
    contact: {
      phone: string;
      email: string;
      address: string;
      company: string;
    };
  }
> = {
  photographer: {
    title: "Pixel Perfect Photography",
    description: "Capturing your special moments with style and creativity.",
    services: ["Photography", "Photo Album", "Video Shoot"],
    images: [
      "https://images.unsplash.com/photo-1520639888714-7b11140c2592",
      "https://images.unsplash.com/photo-1542315192-1a66b6a5c4b5"
    ],
    quotation: "₹25,000 - ₹80,000",
    teamSize: "3 members",
    contact: {
      phone: "+91 98765 43210",
      email: "photo@example.com",
      address: "Photo Studio, MG Road, Pune",
      company: "Pixel Studio"
    }
  },
  caterer: {
    title: "Delicious Catering Services",
    description: "Tasty and hygienic food that makes your event delightful.",
    services: ["Catering", "Buffet Setup", "Live Counters"],
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    ],
    quotation: "₹50,000 - ₹2,00,000",
    teamSize: "10 members",
    contact: {
      phone: "+91 91234 56789",
      email: "cater@example.com",
      address: "Baner, Pune",
      company: "Tasty Caterers"
    }
  },
  decorator: {
    title: "Elegant Event Decorators",
    description: "Transforming venues into dreamscapes.",
    services: ["Flower Decoration", "Lighting", "Stage Setup"],
    images: [
      "https://images.unsplash.com/photo-1554936290-cfac95a0ea0c",
      "https://images.unsplash.com/photo-1573164713988-8665fc963095"
    ],
    quotation: "₹40,000 - ₹1,50,000",
    teamSize: "7 members",
    contact: {
      phone: "+91 99887 77665",
      email: "decor@example.com",
      address: "Model Colony, Pune",
      company: "Elegant Decor"
    }
  }
  // You can add more like mehendi, weddinghall, etc.
};

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams();
  const service = allServiceData[serviceId as string];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + service.images.length) % service.images.length);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % service.images.length);
  };

  if (!service) {
    return <div className="text-center py-20 text-xl">Service not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Image Slider */}
      <div className="relative w-full h-[300px] sm:h-[450px] rounded-xl overflow-hidden shadow-lg">
        <img
          src={service.images[currentIndex]}
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
          <h2 className="text-3xl font-bold text-primary">{service.title}</h2>
          <p className="text-gray-600 text-base">{service.description}</p>

          {/* Service Tags */}
          <div className="flex flex-wrap gap-2">
            {service.services.map((srv, idx) => (
              <span
                key={idx}
                className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {srv}
              </span>
            ))}
          </div>

          {/* Info */}
          <div className="text-sm text-gray-700 space-y-2 pt-4">
            <p>
              <strong>Quotation:</strong> {service.quotation}
            </p>
            <p>
              <strong>Team Size:</strong> {service.teamSize}
            </p>
            <p>
              <strong>Location Available:</strong> Pune, Mumbai, Nashik
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
            <strong>Company:</strong> {service.contact.company}
          </p>
          <p>
            <strong>Phone:</strong> {service.contact.phone}
          </p>
          <p>
            <strong>Email:</strong> {service.contact.email}
          </p>
          <p>
            <strong>Address:</strong> {service.contact.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
