'use client';
import { useState, useEffect } from 'react';

interface Sherwani {
  _id?: string;
  name: string;
  location: string;
  image: string;
  shortDescription: string;
  description: string;
  size: string[];
  price: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export default function AdminSherwani() {
  const initialFormState: Sherwani = {
    name: '',
    location: '',
    image: '',
    shortDescription: '',
    description: '',
    size: ['S', 'M', 'L', 'XL'],
    price: 0
  };

  const [form, setForm] = useState<Sherwani>(initialFormState);
  const [sherwanis, setSherwanis] = useState<Sherwani[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'add' | 'view' | 'delete'>('add');

  // Fetch sherwanis on component mount and when activeTab changes to view/delete
  useEffect(() => {
    const fetchSherwanis = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:1213/api/sherwani');
        
        if (!res.ok) {
          throw new Error('Failed to fetch sherwanis');
        }
        
        const responseData = await res.json();
        console.log('API Response:', responseData); // Debug log
        
        // Handle response format
        if (responseData.success && Array.isArray(responseData.data)) {
          setSherwanis(responseData.data);
        } else {
          console.log('Unexpected response format:', responseData);
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching sherwanis:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab !== 'add') {
      fetchSherwanis();
    }
  }, [activeTab]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Handle size array
    if (name.startsWith('size.')) {
      const index = parseInt(name.split('.')[1]);
      const newSizes = [...form.size];
      newSizes[index] = value;
      setForm(prev => ({ ...prev, size: newSizes }));
    } 
    // Handle price as number
    else if (name === 'price') {
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

  // Array manipulation helpers
  const handleAddSize = () => {
    setForm(prev => ({
      ...prev,
      size: [...prev.size, ''],
    }));
  };

  const handleRemoveSize = (index: number) => {
    const newSizes = form.size.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, size: newSizes }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Prepare data - remove empty strings from arrays
      const formData = {
        ...form,
        size: form.size.filter(size => size.trim() !== ''),
      };

      const res = await fetch('http://localhost:1213/api/sherwani', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || 'Failed to create sherwani');
      }

      // Get the newly created sherwani data from the response
      let newSherwani: Sherwani;
      
      if (responseData.data) {
        newSherwani = responseData.data as Sherwani;
      } else if (responseData._id) {
        newSherwani = responseData as Sherwani;
      } else {
        console.log('Unexpected response format after POST:', responseData);
        throw new Error('Invalid data format in response');
      }

      // Update local state and reset form
      setSherwanis(prev => [...prev, newSherwani]);
      setForm(initialFormState);
      setSuccessMessage('Sherwani added successfully!');
      setActiveTab('view'); // Switch to view tab after successful addition
    } catch (err) {
      console.error('Error creating sherwani:', err);
      setError(err instanceof Error ? err.message : 'Failed to add sherwani');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    
    if (!confirm('Are you sure you want to delete this sherwani?')) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch(`http://localhost:1213/api/sherwani/${id}`, {
        method: 'DELETE',
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || 'Failed to delete sherwani');
      }

      setSherwanis(prev => prev.filter(p => p._id !== id));
      setSuccessMessage('Sherwani deleted successfully!');
    } catch (err) {
      console.error('Error deleting sherwani:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete sherwani');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-center">Sherwani Management</h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex border rounded-md overflow-hidden shadow-sm">
          <button
            className={`px-6 py-2 transition ${activeTab === 'add' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('add')}
          >
            Add Sherwani
          </button>
          <button
            className={`px-6 py-2 transition ${activeTab === 'view' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('view')}
          >
            View Sherwanis
          </button>
          <button
            className={`px-6 py-2 transition ${activeTab === 'delete' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('delete')}
          >
            Manage Sherwanis
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

      {/* Add Sherwani Form */}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Available Sizes*</label>
            {form.size.map((size, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  name={`size.${index}`}
                  value={size}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Size (e.g., S, M, L, XL)"
                />
                {form.size.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(index)}
                    className="ml-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSize}
              className="mt-2 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
            >
              + Add Size
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? 'Submitting...' : 'Add Sherwani'}
          </button>
        </form>
      )}

      {/* View Sherwanis */}
      {activeTab === 'view' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">All Sherwanis</h2>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Loading sherwanis...</p>
            </div>
          ) : sherwanis.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No sherwanis found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sherwanis.map(sherwani => (
                <div key={sherwani._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    {sherwani.image ? (
                      <img 
                        src={sherwani.image} 
                        alt={sherwani.name}
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
                      <h3 className="font-bold text-lg mb-1">{sherwani.name}</h3>
                      <span className="text-green-600 font-bold">₹{sherwani.price.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{sherwani.location}</p>
                    <p className="text-gray-800 text-sm mt-2 line-clamp-2">{sherwani.shortDescription}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {sherwani.size && sherwani.size.map((size, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Sherwanis */}
      {activeTab === 'delete' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Delete Sherwanis</h2>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Loading sherwanis...</p>
            </div>
          ) : sherwanis.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No sherwanis found.</p>
          ) : (
            <div className="space-y-4">
              {sherwanis.map(sherwani => (
                <div key={sherwani._id} className="border rounded-lg p-4 flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {sherwani.image ? (
                        <img 
                          src={sherwani.image} 
                          alt={sherwani.name}
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
                      <h3 className="font-medium">{sherwani.name}</h3>
                      <p className="text-sm text-gray-600">{sherwani.location}</p>
                      <p className="text-sm text-green-600 font-medium">₹{sherwani.price.toLocaleString()}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {sherwani.size && sherwani.size.map((size, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(sherwani._id)}
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