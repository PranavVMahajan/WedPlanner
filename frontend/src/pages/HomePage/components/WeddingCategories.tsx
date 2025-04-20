import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Venue {
  _id: string;
  id?: string;
  title: string;
  description: string;
  shortDescription:string;
  image: string;
  bg: string;
}

const WeddingCategories = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch("http://localhost:1213/api/venues");
        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }
        const data = await response.json();
        
        if (!data.success || !data.data) {
          throw new Error("Invalid data format from API");
        }
        
        setVenues(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (loading) {
    return <div className="w-[90%] mx-auto py-10 text-center">Loading venues...</div>;
  }

  if (error) {
    return <div className="w-[90%] mx-auto py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="w-[90%] mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Wedding Venues in India</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {venues.map((venue, i) => (
          <Link
            to={`/venue/${venue.id || venue.title.replace(/\s+/g, "")}`}
            key={venue._id}
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