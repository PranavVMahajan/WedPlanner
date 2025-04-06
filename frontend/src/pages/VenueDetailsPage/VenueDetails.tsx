import { useParams } from "react-router-dom";

const venues = [
  {
    title: "Taj Falaknuma Palace",
    description: "Royal weddings in Hyderabad's historic luxury palace. Built in 1894, this palace offers a blend of Nizami grandeur and modern amenities, featuring Belgian chandeliers, ornate marble staircases, and 60 lavish rooms.",
    cost: "₹30L - ₹1.5Cr",
    image: "https://images.unsplash.com/photo-1571983371651-221e6c0b910a?q=80&w=2070&auto=format&fit=crop",
    bg: "bg-pink-100",
    contact: {
      phone: "+91 9876543210",
      email: "falaknuma@tajhotels.com",
      address: "Engine Bowli, Falaknuma, Hyderabad, Telangana 500053"
    }
  },
  {
    title: "Umaid Bhawan Palace",
    description: "A regal heritage wedding venue in Jodhpur offering the perfect mix of Rajasthani culture and modern luxury. It's one of the world's largest private residences, making it ideal for royal-themed weddings.",
    cost: "₹25L - ₹1.2Cr",
    image: "https://images.unsplash.com/photo-1605553426886-c0a99033fda0?q=80&w=2070&auto=format&fit=crop",
    bg: "bg-yellow-100",
    contact: {
      phone: "+91 9123456780",
      email: "umaidbhawan@tajhotels.com",
      address: "Circuit House Rd, Cantt Area, Jodhpur, Rajasthan 342006"
    }
  },
  {
    title: "City Palace, Udaipur",
    description: "The majestic palace on the banks of Lake Pichola. Perfect for picturesque weddings with a royal ambience. Ideal for sunset pheras and regal receptions.",
    cost: "₹20L - ₹90L",
    image: "https://images.unsplash.com/photo-1562041524-748f3fbde03b?q=80&w=2125&auto=format&fit=crop",
    bg: "bg-purple-100",
    contact: {
      phone: "+91 9801234567",
      email: "events@citypalaceudaipur.com",
      address: "City Palace Complex, Udaipur, Rajasthan 313001"
    }
  },
  {
    title: "The Leela Palace, Jaipur",
    description: "A perfect blend of luxury and Rajasthani architecture. Its grand banquet halls and lush lawns make it a top destination for dreamy weddings.",
    cost: "₹18L - ₹70L",
    image: "https://images.unsplash.com/photo-1708606811579-23b18fc48007?q=80&w=2071&auto=format&fit=crop",
    bg: "bg-blue-100",
    contact: {
      phone: "+91 9012345678",
      email: "jaipur@theleela.com",
      address: "Delhi Jaipur Highway, Jaipur, Rajasthan 302028"
    }
  },
  {
    title: "Neemrana Fort Palace",
    description: "A heritage 15th-century fort for vintage-style weddings. Offers breathtaking views and old-world charm perfect for intimate ceremonies.",
    cost: "₹10L - ₹50L",
    image: "https://images.unsplash.com/photo-1669225445162-beaaa330dc90?q=80&w=2071&auto=format&fit=crop",
    bg: "bg-green-100",
    contact: {
      phone: "+91 9876543211",
      email: "fort@neemranahotels.com",
      address: "Delhi-Jaipur Highway, Neemrana, Rajasthan 301705"
    }
  },
  {
    title: "ITC Grand Bharat, Gurgaon",
    description: "Elegant destination with world-class amenities, a golf course, and serene luxury to create unforgettable wedding memories.",
    cost: "₹22L - ₹85L",
    image: "https://images.unsplash.com/photo-1708748144709-651ebdab3f96?q=80&w=2070&auto=format&fit=crop",
    bg: "bg-red-100",
    contact: {
      phone: "+91 9988776655",
      email: "grandbharat@itchotels.in",
      address: "P.O. Hasanpur, Tauru, Gurugram, Haryana 122105"
    }
  },
  {
    title: "Suryagarh, Jaisalmer",
    description: "A desert fort hotel perfect for majestic ceremonies under the stars with a Rajasthani touch. Offers camel processions, folk artists, and sandstone charm.",
    cost: "₹15L - ₹75L",
    image: "https://images.unsplash.com/photo-1736155983520-a0f7d5949d39?q=80&w=2069&auto=format&fit=crop",
    bg: "bg-orange-100",
    contact: {
      phone: "+91 9871234567",
      email: "info@suryagarh.com",
      address: "Sam Road, Jaisalmer, Rajasthan 345001"
    }
  },
  {
    title: "JW Marriott, Mussoorie",
    description: "A luxury retreat with Himalayan views and cozy wooden interiors. Ideal for intimate weddings with nature’s backdrop.",
    cost: "₹12L - ₹65L",
    image: "https://images.unsplash.com/photo-1591203281954-23fa2ff8ef18?q=80&w=2076&auto=format&fit=crop",
    bg: "bg-indigo-100",
    contact: {
      phone: "+91 9034567890",
      email: "mussoorie@marriott.com",
      address: "Village Siya, Kempty Fall Road, Tehri Garhwal, Uttarakhand 248179"
    }
  }
];

const VenueDetails = () => {
    const { venueName } = useParams<{ venueName?: string }>();
  
    if (!venueName) return <div className="p-10 text-red-600">Venue name is missing in the URL!</div>;
  
    const formattedVenueName = venueName.replace(/,/g, "").replace(/\s+/g, "");
    const venue = venues.find(
      (v) => v.title.replace(/\s+/g, "").replace(/,/g, "") === formattedVenueName
    );
  
    if (!venue) return <div className="p-10 text-red-600">Venue not found!</div>;
  
    return (
      <div className="max-w-7xl mx-auto p-8 flex flex-col lg:flex-row gap-10">
        {/* Main Content */}
        <div className="lg:w-3/4">
          <h1 className="text-4xl font-bold text-primary mb-4">{venue.title}</h1>
          <img
            src={venue.image}
            alt={venue.title}
            className="rounded-xl w-full h-[400px] object-cover mb-6"
          />
          <p className="text-xl text-gray-700 mb-4">{venue.description}</p>
          <p className="text-lg font-semibold text-gray-800 mb-6">
            <span className="text-primary font-bold">Estimated Cost:</span> {venue.cost}
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition">
            Book Venue
          </button>
        </div>
  
        {/* Sidebar */}
        <div className="lg:w-1/4 bg-gray-100 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-2"><span className="font-bold">Phone:</span> {venue.contact.phone}</p>
          <p className="mb-2"><span className="font-bold">Email:</span> {venue.contact.email}</p>
          <p className="mb-2"><span className="font-bold">Address:</span><br />{venue.contact.address}</p>
        </div>
      </div>
    );
  };
  

export default VenueDetails;
