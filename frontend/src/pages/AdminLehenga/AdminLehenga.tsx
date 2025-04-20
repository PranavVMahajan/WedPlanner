'use client';
import { useState, useEffect } from 'react';

interface BridalLehenga {
  _id?: string;
  name: string;
  location: string;
  price: number;
  image: string;
  shortDescription: string;
  description: string;
  size: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export default function AdminLehengas() {
  const initialFormState: BridalLehenga = {
    name: '',
    location: '',
    price: 0,
    image: '',
    shortDescription: '',
    description: '',
    size: ['S', 'M', 'L'],
  };

  const [form, setForm] = useState<BridalLehenga>(initialFormState);
  const [lehengas, setLehengas] = useState<BridalLehenga[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'add' | 'view' | 'delete'>('add');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, boolean>>({
    'S': true,
    'M': true,
    'L': true,
  });

  // Fetch lehengas on component mount and when activeTab changes to view/delete
  useEffect(() => {
    const fetchLehengas = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:1213/api/lehenga');
        
        if (!res.ok) {
          throw new Error('Failed to fetch bridal lehengas');
        }
        
        const responseData = await res.json();
        console.log('API Response:', responseData); // Debug log
        
        // Handle response format
        if (responseData.success && Array.isArray(responseData.data)) {
          setLehengas(responseData.data);
        } else {
          console.log('Unexpected response format:', responseData);
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching bridal lehengas:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab !== 'add') {
      fetchLehengas();
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

  const handleSizeChange = (size: string) => {
    const newSelectedSizes = {
      ...selectedSizes,
      [size]: !selectedSizes[size]
    };
    
    setSelectedSizes(newSelectedSizes);
    
    // Update form with selected sizes
    const updatedSizes = Object.keys(newSelectedSizes).filter(size => newSelectedSizes[size]);
    setForm(prev => ({
      ...prev,
      size: updatedSizes
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch('http://localhost:1213/api/lehenga', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || 'Failed to create bridal lehenga');
      }

      // Get the newly created lehenga data from the response
      let newLehenga: BridalLehenga;
      
      if (responseData.data) {
        newLehenga = responseData.data as BridalLehenga;
      } else if (responseData._id) {
        newLehenga = responseData as BridalLehenga;
      } else {
        console.log('Unexpected response format after POST:', responseData);
        throw new Error('Invalid data format in response');
      }

      // Update local state and reset form
      setLehengas(prev => [...prev, newLehenga]);
      setForm(initialFormState);
      setSuccessMessage('Bridal lehenga added successfully!');
      setActiveTab('view'); // Switch to view tab after successful addition
    } catch (err) {
      console.error('Error creating bridal lehenga:', err);
      setError(err instanceof Error ? err.message : 'Failed to add bridal lehenga');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    
    if (!confirm('Are you sure you want to delete this bridal lehenga?')) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch(`http://localhost:1213/api/lehenga/${id}`, {
        method: 'DELETE',
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || 'Failed to delete bridal lehenga');
      }

      setLehengas(prev => prev.filter(l => l._id !== id));
      setSuccessMessage('Bridal lehenga deleted successfully!');
    } catch (err) {
      console.error('Error deleting bridal lehenga:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete bridal lehenga');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-center">Bridal Lehenga Management</h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex border rounded-md overflow-hidden shadow-sm">
          <button
            className={`px-6 py-2 transition ${activeTab === 'add' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('add')}
          >
            Add Bridal Lehenga
          </button>
          <button
            className={`px-6 py-2 transition ${activeTab === 'view' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('view')}
          >
            View Bridal Lehengas
          </button>
          <button
            className={`px-6 py-2 transition ${activeTab === 'delete' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('delete')}
          >
            Manage Bridal Lehengas
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

      {/* Add Bridal Lehenga Form */}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sizes*</label>
              <div className="flex gap-4 mt-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <label key={size} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSizes[size] || false}
                      onChange={() => handleSizeChange(size)}
                      className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span className="ml-2 text-sm">{size}</span>
                  </label>
                ))}
              </div>
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
            {isLoading ? 'Submitting...' : 'Add Bridal Lehenga'}
          </button>
        </form>
      )}

      {/* View Bridal Lehengas */}
      {activeTab === 'view' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">All Bridal Lehengas</h2>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Loading bridal lehengas...</p>
            </div>
          ) : lehengas.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No bridal lehengas found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lehengas.map(lehenga => (
                <div key={lehenga._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    {lehenga.image ? (
                      <img 
                        src={lehenga.image} 
                        alt={lehenga.name}
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
                      <h3 className="font-bold text-lg mb-1">{lehenga.name}</h3>
                      <span className="text-green-600 font-bold">₹{lehenga.price.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{lehenga.location}</p>
                    <p className="text-gray-700 text-sm mt-1">
                      Sizes: {lehenga.size.join(', ')}
                    </p>
                    <p className="text-gray-800 text-sm mt-2 line-clamp-2">{lehenga.shortDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Bridal Lehengas */}
      {activeTab === 'delete' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Delete Bridal Lehengas</h2>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Loading bridal lehengas...</p>
            </div>
          ) : lehengas.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No bridal lehengas found.</p>
          ) : (
            <div className="space-y-4">
              {lehengas.map(lehenga => (
                <div key={lehenga._id} className="border rounded-lg p-4 flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {lehenga.image ? (
                        <img 
                          src={lehenga.image} 
                          alt={lehenga.name}
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
                      <h3 className="font-medium">{lehenga.name}</h3>
                      <p className="text-sm text-gray-600">{lehenga.location}</p>
                      <p className="text-sm text-gray-600">Sizes: {lehenga.size.join(', ')}</p>
                      <p className="text-sm text-green-600 font-medium">₹{lehenga.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(lehenga._id)}
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