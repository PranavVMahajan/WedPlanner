import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface BandProvider {
  _id: string;
  name: string;
  location: string;
  price: number;
  image: string;
  shortDescription: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: BandProvider[];
}

const MusicDetail = () => {
  const { musicName } = useParams<{ musicName?: string }>();
  const [providers, setProviders] = useState<BandProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:1213/api/weddingBand");
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const result: ApiResponse = await response.json();
        
        if (result.success) {
          setProviders(result.data);
        } else {
          throw new Error("Failed to get providers data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch music providers");
        console.error("Error fetching music data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMusicData();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl">Loading wedding band providers...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600">Error Loading Providers</h2>
        <p className="mt-2 text-gray-600">{error}</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Available Wedding Band Providers
      </h1>
      
      {providers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <div key={provider._id} className="border rounded-lg shadow-md overflow-hidden">
              {/* Image */}
              <div className="h-48 bg-gray-200">
                {provider.image ? (
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
              </div>
              
              {/* Info Section */}
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">
                    {provider.name}
                  </h3>
                  <p className="text-gray-600">
                    {provider.location}
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    {provider.shortDescription}
                  </p>
                  <ul className="mt-2 text-sm text-gray-700">
                    <li>Starting from ₹{provider.price}</li>
                    <li>Professional Artists</li>
                    <li>Highly Rated</li>
                  </ul>
                </div>
                
                <div className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  Verified & Trusted
                </div>
              </div>
              
              {/* Price Block */}
              <div className="bg-gray-50 p-4 border-t">
                <div className="flex items-end mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{provider.price}
                  </span>
                  <span className="ml-2 text-sm line-through text-gray-500">
                    ₹{provider.price + 1500}
                  </span>
                  <span className="ml-2 text-xs text-green-600 font-semibold">
                    Special Offer
                  </span>
                </div>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
                  Book Now
                </button>
                
                <div className="mt-2 text-center text-xs text-gray-500">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Assured
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600">No providers available for this service.</p>
        </div>
      )}
    </div>
  );
};

export default MusicDetail;