import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Photographer {
  _id: string;
  id: string;
  name: string;
  description: string;
  images: string[]; // Changed from 'image' to 'images' array
  // ... other properties if they exist in your API response
}

const PhotographerList = () => {
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1213/api/inhouseServices/photographers"
        );
        // Handle both array response and object with data property
        const data = Array.isArray(response.data) 
          ? response.data 
          : response.data.data || [];
        setPhotographers(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch photographers");
        setLoading(false);
        console.error("Error fetching photographers:", err);
      }
    };

    fetchPhotographers();
  }, []);

  const handleClick = (id: string) => {
    navigate(`/services/photographer/${id}`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-primary">Our Photographers</h2>
        <div className="text-center py-10">Loading photographers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-primary">Our Photographers</h2>
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  if (photographers.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-primary">Our Photographers</h2>
        <div className="text-center py-10">No photographers available</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-primary">Our Photographers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {photographers.map((photographer) => (
          <div
            key={photographer._id}
            onClick={() => handleClick(photographer.id)}
            className="cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 bg-white"
          >
            {/* Use the first image from the images array */}
            <img
              src={photographer.images[0]} // Changed from photographer.image to photographer.images[0]
              alt={photographer.name}
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {photographer.name}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {photographer.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotographerList;