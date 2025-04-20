import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface Contact {
  phone: string;
  email: string;
  address: string;
  _id: string;
}

interface Venue {
  _id: string;
  id?: string;
  title: string;
  description: string;
  shortDescription?: string;
  cost: string;
  image: string;
  bg: string;
  contact: Contact;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  data: Venue[];
}

const VenueDetails = () => {
  const { venueName } = useParams<{ venueName?: string }>();
  const [showModal, setShowModal] = useState(false);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch("http://localhost:1213/api/venues");
        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }
        const data: ApiResponse = await response.json();
        
        if (!data.success || !data.data) {
          throw new Error("Invalid data format from API");
        }

        if (!venueName) {
          setError("Venue name is missing in the URL!");
          return;
        }

        const formattedVenueName = venueName.replace(/,/g, "").replace(/\s+/g, "").toLowerCase();
        const foundVenue = data.data.find(
          (v) => v.title.replace(/\s+/g, "").replace(/,/g, "").toLowerCase() === formattedVenueName ||
                (v.id && v.id.toLowerCase() === formattedVenueName)
        );

        if (!foundVenue) {
          setError("Venue not found!");
        } else {
          setVenue(foundVenue);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [venueName]);

  if (loading) {
    return <div className="p-10 text-center">Loading venue details...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-600">{error}</div>;
  }

  if (!venue) {
    return <div className="p-10 text-red-600">Venue not available</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8 flex flex-col lg:flex-row gap-10 relative">
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
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition"
        >
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

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-8 relative">
            {/* Close Icon */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-red-500"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-6">Book {venue.title}</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full border rounded-lg px-4 py-2" />
              <input type="tel" placeholder="Phone Number" className="w-full border rounded-lg px-4 py-2" />
              <input type="email" placeholder="Email" className="w-full border rounded-lg px-4 py-2" />
              <input type="number" placeholder="Number of Days" className="w-full border rounded-lg px-4 py-2" />
              <input type="text" placeholder="Estimated Budget" className="w-full border rounded-lg px-4 py-2" />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueDetails;