'use client';
import { useState, useEffect } from 'react';

interface WeddingBand {
  _id?: string;
  name: string;
  location: string;
  price: number;
  image: string;
  shortDescription: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export default function AdminBands() {
  const initialFormState: WeddingBand = {
    name: '',
    location: '',
    price: 0,
    image: '',
    shortDescription: '',
    description: '',
  };

  const [form, setForm] = useState<WeddingBand>(initialFormState);
  const [bands, setBands] = useState<WeddingBand[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'add' | 'view' | 'delete'>('add');

  // Fetch wedding bands on component mount and when activeTab changes to view/delete
  useEffect(() => {
    const fetchBands = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:1213/api/weddingBand');
        
        if (!res.ok) {
          throw new Error('Failed to fetch wedding bands');
        }
        
        const responseData = await res.json();
        console.log('API Response:', responseData); // Debug log
        
        // Handle response format
        if (responseData.success && Array.isArray(responseData.data)) {
          setBands(responseData.data);
        } else {
          console.log('Unexpected response format:', responseData);
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching wedding bands:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab !== 'add') {
      fetchBands();
    }
  }, [activeTab]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Handle price as number
    if (name === 'price') {
      setForm(prev => ({
        ...prev,
        [name]: value ? parseInt(value) : 0,
      }));
    } 
    // Handle regular fields
    else {
      setForm(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch('http://localhost:1213/api/weddingBand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || 'Failed to create wedding band');
      }

      // Get the newly created wedding band data from the response
      let newBand: WeddingBand;
      
      if (responseData.data) {
        newBand = responseData.data as WeddingBand;
      } else if (responseData._id) {
        newBand = responseData as WeddingBand;
      } else {
        console.log('Unexpected response format after POST:', responseData);
        throw new Error('Invalid data format in response');
      }

      // Update local state and reset form
      setBands(prev => [...prev, newBand]);
      setForm(initialFormState);
      setSuccessMessage('Wedding band added successfully!');
      setActiveTab('view'); // Switch to view tab after successful addition
    } catch (err) {
      console.error('Error creating wedding band:', err);
      setError(err instanceof Error ? err.message : 'Failed to add wedding band');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    
    if (!confirm('Are you sure you want to delete this wedding band?')) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch(`http://localhost:1213/api/weddingBand/${id}`, {
        method: 'DELETE',
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || 'Failed to delete wedding band');
      }

      setBands(prev => prev.filter(b => b._id !== id));
      setSuccessMessage('Wedding band deleted successfully!');
    } catch (err) {
      console.error('Error deleting wedding band:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete wedding band');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-center">Wedding Band Management</h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex border rounded-md overflow-hidden shadow-sm">
          <button
            className={`px-6 py-2 transition ${activeTab === 'add' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('add')}
          >
            Add Wedding Band
          </button>
          <button
            className={`px-6 py-2 transition ${activeTab === 'view' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('view')}
          >
            View Wedding Bands
          </button>
          <button
            className={`px-6 py-2 transition ${activeTab === 'delete' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('delete')}
          >
            Manage Wedding Bands
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md border border-green-200">
          {successMessage}
        </div>
      )}

      {/* Add Wedding Band Form */}
      {activeTab === 'add' && (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL*</label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)*</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description*</label>
            <input
              type="text"
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Description*</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? 'Submitting...' : 'Add Wedding Band'}
          </button>
        </form>
      )}

      {/* View Wedding Bands */}
      {activeTab === 'view' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">All Wedding Bands</h2>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Loading wedding bands...</p>
            </div>
          ) : bands.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No wedding bands found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bands.map(band => (
                <div key={band._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    {band.image ? (
                      <img 
                        src={band.image} 
                        alt={band.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg mb-1">{band.name}</h3>
                      <span className="text-green-600 font-bold">₹{band.price.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{band.location}</p>
                    <p className="text-gray-800 text-sm mt-2 line-clamp-2">{band.shortDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Wedding Bands */}
      {activeTab === 'delete' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Delete Wedding Bands</h2>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Loading wedding bands...</p>
            </div>
          ) : bands.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No wedding bands found.</p>
          ) : (
            <div className="space-y-4">
              {bands.map(band => (
                <div key={band._id} className="border rounded-lg p-4 flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {band.image ? (
                        <img 
                          src={band.image} 
                          alt={band.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{band.name}</h3>
                      <p className="text-sm text-gray-600">{band.location}</p>
                      <p className="text-sm text-green-600 font-medium">₹{band.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(band._id)}
                    disabled={isLoading}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}