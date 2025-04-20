'use client';
import { useState, useEffect } from 'react';

interface Contact {
  email: string;
}

interface Decoration {
  _id?: string;
  id?: string;
  name: string;
  image: string;
  shortDescription: string;
  description: string;
  services: string[];
  price: string;
  contact: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// API response structure
interface ApiResponse {
  message?: string;
  data?: Decoration[] | Decoration;
  success?: boolean;
}

export default function AdminDecor() {
  const initialFormState: Decoration = {
    name: '',
    image: '',
    shortDescription: '',
    description: '',
    services: [''],
    price: '',
    contact: '',
  };

  const [form, setForm] = useState<Decoration>(initialFormState);
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'add' | 'view' | 'delete'>('add');

  // Fetch decorations on component mount and when activeTab changes to view/delete
  useEffect(() => {
    const fetchDecorations = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:1213/api/inhouseServices/decoration');
        
        if (!res.ok) {
          throw new Error('Failed to fetch decorations');
        }
        
        const responseData = await res.json();
        console.log('API Response:', responseData); // Debug log
        
        // Handle different possible response formats
        let decorationsData: Decoration[] = [];
        
        if (Array.isArray(responseData)) {
          // Case 1: Response is directly an array of decorations
          decorationsData = responseData;
        } else if (responseData.data && Array.isArray(responseData.data)) {
          // Case 2: Response has a data property that is an array
          decorationsData = responseData.data;
        } else if (typeof responseData === 'object' && !Array.isArray(responseData)) {
          // Case 3: Response might be a single decoration object or something else
          console.log('Unexpected response format - not an array:', responseData);
          throw new Error('Invalid data format received');
        }
        
        if (decorationsData.length > 0) {
          setDecorations(decorationsData);
        } else {
          // Empty array is valid but we should log it
          console.log('No decorations found:', responseData);
          setDecorations([]);
        }
      } catch (err) {
        console.error('Error fetching decorations:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab !== 'add') {
      fetchDecorations();
    }
  }, [activeTab]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Handle services array
    if (name.startsWith('services.')) {
      const index = parseInt(name.split('.')[1]);
      const newServices = [...form.services];
      newServices[index] = value;
      setForm(prev => ({ ...prev, services: newServices }));
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
  const handleAddService = () => {
    setForm(prev => ({
      ...prev,
      services: [...prev.services, ''],
    }));
  };

  const handleRemoveService = (index: number) => {
    const newServices = form.services.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, services: newServices }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Prepare data - remove empty strings from arrays and generate ID if not provided
      const formData = {
        ...form,
        services: form.services.filter(service => service.trim() !== ''),
        id: form.id || form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      };

      const res = await fetch('http://localhost:1213/api/inhouseServices/decoration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || 'Failed to create decoration');
      }

      // Get the newly created decoration data from the response
      let newDecoration: Decoration;
      
      if (responseData.data) {
        // If response follows { message, data } format
        newDecoration = responseData.data as Decoration;
      } else if (responseData.id || responseData._id) {
        // If response is the decoration object directly
        newDecoration = responseData as Decoration;
      } else {
        console.log('Unexpected response format after POST:', responseData);
        throw new Error('Invalid data format in response');
      }

      // Update local state and reset form
      setDecorations(prev => [...prev, newDecoration]);
      setForm(initialFormState);
      setSuccessMessage('Decoration added successfully!');
      setActiveTab('view'); // Switch to view tab after successful addition
    } catch (err) {
      console.error('Error creating decoration:', err);
      setError(err instanceof Error ? err.message : 'Failed to add decoration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    
    if (!confirm('Are you sure you want to delete this decoration?')) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch(`http://localhost:1213/api/inhouseServices/decoration/${id}`, {
        method: 'DELETE',
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || 'Failed to delete decoration');
      }

      setDecorations(prev => prev.filter(p => p._id !== id && p.id !== id));
      setSuccessMessage('Decoration deleted successfully!');
    } catch (err) {
      console.error('Error deleting decoration:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete decoration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-center">Decoration Management</h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex border rounded-md overflow-hidden shadow-sm">
          <button
            className={`px-6 py-2 transition ${activeTab === 'add' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('add')}
          >
            Add Decoration
          </button>
          <button
            className={`px-6 py-2 transition ${activeTab === 'view' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('view')}
          >
            View Decorations
          </button>
          <button
            className={`px-6 py-2 transition ${activeTab === 'delete' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('delete')}
          >
            Manage Decorations
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

      {/* Add Decoration Form */}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">URL ID</label>
              <input
                type="text"
                name="id"
                value={form.id || ''}
                onChange={handleChange}
                placeholder="Auto-generated if empty"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="From ₹30,000"
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email*</label>
            <input
              type="email"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
            {form.services.map((service, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  name={`services.${index}`}
                  value={service}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Service ${index + 1}`}
                />
                {form.services.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveService(index)}
                    className="ml-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddService}
              className="mt-2 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
            >
              + Add Service
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? 'Submitting...' : 'Add Decoration'}
          </button>
        </form>
      )}

      {/* View Decorations */}
      {activeTab === 'view' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">All Decorations</h2>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Loading decorations...</p>
            </div>
          ) : decorations.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No decorations found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {decorations.map(decoration => (
                <div key={decoration._id || decoration.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    {decoration.image ? (
                      <img 
                        src={decoration.image} 
                        alt={decoration.name}
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
                    <h3 className="font-bold text-lg mb-1">{decoration.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{decoration.shortDescription}</p>
                    <p className="text-blue-600 font-medium">{decoration.price}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {decoration.services && decoration.services.slice(0, 3).map((service, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                          {service}
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

      {/* Delete Decorations */}
      {activeTab === 'delete' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Delete Decorations</h2>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Loading decorations...</p>
            </div>
          ) : decorations.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No decorations found.</p>
          ) : (
            <div className="space-y-4">
              {decorations.map(decoration => (
                <div key={decoration._id || decoration.id} className="border rounded-lg p-4 flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {decoration.image ? (
                        <img 
                          src={decoration.image} 
                          alt={decoration.name}
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
                      <h3 className="font-medium">{decoration.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-1">{decoration.shortDescription}</p>
                      <p className="text-sm text-blue-600">{decoration.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(decoration._id || decoration.id)}
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