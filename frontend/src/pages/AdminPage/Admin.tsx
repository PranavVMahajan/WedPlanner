import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaCogs, FaSignOutAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

// Define interfaces for API responses
interface ApiResponse {
  success?: boolean;
  data?: any[];
}

const Admin = () => {
  // State for service counts
  const [counts, setCounts] = useState({
    venues: 0,
    photography: 0,
    caterers: 0,
    decors: 0,
    sherwani: 0,
    lehenga: 0,
    bands: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Function to fetch count from a specific API endpoint
    const fetchCount = async (endpoint: string): Promise<number> => {
      try {
        const response = await fetch(`http://localhost:1213${endpoint}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${endpoint}`);
        }
        
        const data = await response.json();
        
        // Handle different response formats
        if (Array.isArray(data)) {
          return data.length;
        } else if (data.data && Array.isArray(data.data)) {
          return data.data.length;
        } else if (data.success && Array.isArray(data.data)) {
          return data.data.length;
        }
        
        return 0;
      } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
        return 0;
      }
    };

    // Fetch all counts simultaneously with the correct endpoints
    const fetchAllCounts = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        const [
          venuesCount,
          photographyCount,
          caterersCount,
          decorCount,
          sherwaniCount,
          lehengaCount,
          bandsCount
        ] = await Promise.all([
          fetchCount('/api/venues'),
          fetchCount('/api/inhouseServices/photographers'),
          fetchCount('/api/inhouseServices/catering'),
          fetchCount('/api/inhouseServices/decoration'),
          fetchCount('/api/sherwani'),
          fetchCount('/api/lehenga'),
          fetchCount('/api/weddingBand')
        ]);

        setCounts({
          venues: venuesCount,
          photography: photographyCount,
          caterers: caterersCount,
          decors: decorCount,
          sherwani: sherwaniCount,
          lehenga: lehengaCount,
          bands: bandsCount
        });
      } catch (err) {
        console.error('Error fetching service counts:', err);
        setError('Failed to load some service counts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCounts();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-screen p-5">
        <div className="text-3xl text-center mb-8">
          <h1>Admin Panel</h1>
        </div>
        <ul>
          <li className="mb-4">
            <Link to="/admin/dashboard" className="flex items-center gap-3 text-lg hover:text-gray-400">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li className="mb-4">
             <Link to="/admin/dashboard/venues" className="flex items-center gap-3 text-lg hover:text-gray-400">
               <FaCogs /> Wedding Venues
               
             </Link>
          </li>
          <li className="mb-4">
             <Link to="/admin/dashboard/photography" className="flex items-center gap-3 text-lg hover:text-gray-400">
               <FaCogs /> Wedding Photography
               
             </Link>
          </li>
          <li className="mb-4">
             <Link to="/admin/dashboard/caterers" className="flex items-center gap-3 text-lg hover:text-gray-400">
               <FaCogs /> Wedding Caterers
               
             </Link>
          </li>
          <li className="mb-4">
             <Link to="/admin/dashboard/decors" className="flex items-center gap-3 text-lg hover:text-gray-400">
               <FaCogs /> Wedding Decors
               
             </Link>
          </li>
          <li className="mb-4">
             <Link to="/admin/dashboard/sherwani" className="flex items-center gap-3 text-lg hover:text-gray-400">
               <FaCogs /> Wedding Sherwani
               
             </Link>
          </li>
          <li className="mb-4">
             <Link to="/admin/dashboard/lehenga" className="flex items-center gap-3 text-lg hover:text-gray-400">
               <FaCogs /> Wedding Lehenga
               
             </Link>
          </li>
          <li className="mb-4">
             <Link to="/admin/dashboard/bands" className="flex items-center gap-3 text-lg hover:text-gray-400">
               <FaCogs /> Wedding Bands
               
             </Link>
          </li>

          <li className="mt-8">
            <Link to="/" className="flex items-center gap-3 text-lg hover:text-gray-400">
              <FaSignOutAlt /> Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white shadow-lg rounded-md p-6">
          <h2 className="text-2xl font-semibold mb-5">Welcome to the Admin Panel</h2>
          
          {isLoading && (
            <div className="flex justify-center items-center h-24">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
              <p className="ml-2">Loading service counts...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service Count Cards */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Venues</h3>
              <p className="text-3xl text-blue-700">{counts.venues}</p>
            </div>

            <div className="bg-green-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Photographers</h3>
              <p className="text-3xl text-green-700">{counts.photography}</p>
            </div>

            <div className="bg-purple-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Caterers</h3>
              <p className="text-3xl text-purple-700">{counts.caterers}</p>
            </div>

            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Decors</h3>
              <p className="text-3xl text-yellow-700">{counts.decors}</p>
            </div>
            
            <div className="bg-red-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Sherwani</h3>
              <p className="text-3xl text-red-700">{counts.sherwani}</p>
            </div>
            
            <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Lehenga</h3>
              <p className="text-3xl text-indigo-700">{counts.lehenga}</p>
            </div>
            
            <div className="bg-pink-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Bands</h3>
              <p className="text-3xl text-pink-700">{counts.bands}</p>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Total Services</h3>
              <p className="text-3xl text-gray-700">
                {Object.values(counts).reduce((sum, count) => sum + count, 0)}
              </p>
            </div>
          </div>
          
          {/* Additional Dashboard Content */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-3">Recent Activity</h3>
              <p className="text-gray-700">No recent activities to display.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-3">System Status</h3>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <p className="text-gray-700">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;