'use client';
import { useState, useEffect } from 'react';

interface Contact {
  company: string;
  phone: string;
  email: string;
  address: string;
}

interface Caterer {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  images: string[];
  cuisines: string[];
  price: string;
  teamSize: string;
  locations: string[];
  contact: Contact;
  __v?: number;
}

// This could be the structure for different API response formats
interface ApiResponse {
  message?: string;
  data?: Caterer[] | Caterer;
  success?: boolean;
}

export default function AdminCatering() {
  const initialFormState: Caterer = {
    name: '',
    description: '',
    images: ['', '', ''],
    cuisines: [''],
    price: '',
    teamSize: '',
    locations: [''],
    contact: {
      company: '',
      phone: '',
      email: '',
      address: '',
    },
  };

  const [form, setForm] = useState<Caterer>(initialFormState);
  const [caterers, setCaterers] = useState<Caterer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'add' | 'view' | 'delete'>('add');

  // Fetch caterers on component mount and when activeTab changes to view/delete
  useEffect(() => {
    const fetchCaterers = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:1213/api/inhouseServices/catering');
        
        if (!res.ok) {
          throw new Error('Failed to fetch caterers');
        }
        
        const responseData = await res.json();
        console.log('API Response:', responseData); // Debug log
        
        // Handle different possible response formats
        let caterersData: Caterer[] = [];
        
        if (Array.isArray(responseData)) {
          // Case 1: Response is directly an array of caterers
          caterersData = responseData;
        } else if (responseData.data && Array.isArray(responseData.data)) {
          // Case 2: Response has a data property that is an array
          caterersData = responseData.data;
        } else if (typeof responseData === 'object' && !Array.isArray(responseData)) {
          // Case 3: Response might be a single caterer object or something else
          console.log('Unexpected response format - not an array:', responseData);
          throw new Error('Invalid data format received');
        }
        
        if (caterersData.length > 0) {
          setCaterers(caterersData);
        } else {
          // Empty array is valid but we should log it
          console.log('No caterers found:', responseData);
          setCaterers([]);
        }
      } catch (err) {
        console.error('Error fetching caterers:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab !== 'add') {
      fetchCaterers();
    }
  }, [activeTab]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Handle nested contact object fields
    if (name.startsWith('contact.')) {
      const contactField = name.split('.')[1] as keyof Contact;
      setForm(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [contactField]: value,
        },
      }));
    } 
    // Handle images array
    else if (name.startsWith('images.')) {
      const index = parseInt(name.split('.')[1]);
      const newImages = [...form.images];
      newImages[index] = value;
      setForm(prev => ({ ...prev, images: newImages }));
    } 
    // Handle cuisines array
    else if (name.startsWith('cuisines.')) {
      const index = parseInt(name.split('.')[1]);
      const newCuisines = [...form.cuisines];
      newCuisines[index] = value;
      setForm(prev => ({ ...prev, cuisines: newCuisines }));
    } 
    // Handle locations array
    else if (name.startsWith('locations.')) {
      const index = parseInt(name.split('.')[1]);
      const newLocations = [...form.locations];
      newLocations[index] = value;
      setForm(prev => ({ ...prev, locations: newLocations }));
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
  const handleAddCuisine = () => {
    setForm(prev => ({
      ...prev,
      cuisines: [...prev.cuisines, ''],
    }));
  };

  const handleRemoveCuisine = (index: number) => {
    const newCuisines = form.cuisines.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, cuisines: newCuisines }));
  };

  const handleAddLocation = () => {
    setForm(prev => ({
      ...prev,
      locations: [...prev.locations, ''],
    }));
  };

  const handleRemoveLocation = (index: number) => {
    const newLocations = form.locations.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, locations: newLocations }));
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
        images: form.images.filter(img => img.trim() !== ''),
        cuisines: form.cuisines.filter(cuisine => cuisine.trim() !== ''),
        locations: form.locations.filter(location => location.trim() !== ''),
        id: form.id || form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      };

      const res = await fetch('http://localhost:1213/api/inhouseServices/catering', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || 'Failed to create caterer');
      }

      // Get the newly created caterer data from the response
      let newCaterer: Caterer;
      
      if (responseData.data) {
        // If response follows { message, data } format
        newCaterer = responseData.data as Caterer;
      } else if (responseData.id || responseData._id) {
        // If response is the caterer object directly
        newCaterer = responseData as Caterer;
      } else {
        console.log('Unexpected response format after POST:', responseData);
        throw new Error('Invalid data format in response');
      }

      // Update local state and reset form
      setCaterers(prev => [...prev, newCaterer]);
      setForm(initialFormState);
      setSuccessMessage('Caterer added successfully!');
      setActiveTab('view'); // Switch to view tab after successful addition
    } catch (err) {
      console.error('Error creating caterer:', err);
      setError(err instanceof Error ? err.message : 'Failed to add caterer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    
    if (!confirm('Are you sure you want to delete this caterer?')) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch(`http://localhost:1213/api/inhouseServices/catering/${id}`, {
        method: 'DELETE',
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || 'Failed to delete caterer');
      }

      setCaterers(prev => prev.filter(p => p._id !== id));
      setSuccessMessage('Caterer deleted successfully!');
    } catch (err) {
      console.error('Error deleting caterer:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete caterer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-center">Catering Management</h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex border rounded-md overflow-hidden shadow-sm">
          <button
            className={`px-6 py-2 transition ${activeTab === 'add' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('add')}
          >
            Add Caterer
          </button>
          <button
            className={`px-6 py-2 transition ${activeTab === 'view' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('view')}
          >
            View Caterers
          </button>
          <button
            className={`px-6 py-2 transition ${activeTab === 'delete' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('delete')}
          >
            Manage Caterers
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

      {/* Add Caterer Form */}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                placeholder="e.g. ₹1,200 per plate"
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team Size*</label>
              <input
                type="text"
                name="teamSize"
                value={form.teamSize}
                onChange={handleChange}
                required
                placeholder="e.g. 15 staff"
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (max 3)</label>
            {form.images.map((image, index) => (
              <div key={index} className="mb-2 flex">
                <input
                  type="url"
                  name={`images.${index}`}
                  value={image}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Image URL ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cuisines</label>
            {form.cuisines.map((cuisine, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  name={`cuisines.${index}`}
                  value={cuisine}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Cuisine ${index + 1}`}
                />
                {form.cuisines.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCuisine(index)}
                    className="ml-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddCuisine}
              className="mt-2 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
            >
              + Add Cuisine
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Locations</label>
            {form.locations.map((location, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  name={`locations.${index}`}
                  value={location}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Location ${index + 1}`}
                />
                {form.locations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveLocation(index)}
                    className="ml-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddLocation}
              className="mt-2 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
            >
              + Add Location
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company*</label>
              <input
                type="text"
                name="contact.company"
                value={form.contact.company}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
              <input
                type="tel"
                name="contact.phone"
                value={form.contact.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
              <input
                type="email"
                name="contact.email"
                value={form.contact.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
              <input
                type="text"
                name="contact.address"
                value={form.contact.address}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? 'Submitting...' : 'Add Caterer'}
          </button>
        </form>
      )}

      {/* View Caterers */}
      {activeTab === 'view' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">All Caterers</h2>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Loading caterers...</p>
            </div>
          ) : caterers.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No caterers found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caterers.map(caterer => (
                <div key={caterer._id || caterer.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    {caterer.images && caterer.images[0] ? (
                      <img 
                        src={caterer.images[0]} 
                        alt={caterer.name}
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
                    <h3 className="font-bold text-lg mb-1">{caterer.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{caterer.description}</p>
                    <p className="text-blue-600 font-medium">{caterer.price}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {caterer.cuisines && caterer.cuisines.slice(0, 3).map((cuisine, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                          {cuisine}
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

      {/* Delete Caterers */}
      {activeTab === 'delete' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Delete Caterers</h2>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Loading caterers...</p>
            </div>
          ) : caterers.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No caterers found.</p>
          ) : (
            <div className="space-y-4">
              {caterers.map(caterer => (
                <div key={caterer._id || caterer.id} className="border rounded-lg p-4 flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {caterer.images && caterer.images[0] ? (
                        <img 
                          src={caterer.images[0]} 
                          alt={caterer.name}
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
                      <h3 className="font-medium">{caterer.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-1">{caterer.description}</p>
                      <p className="text-sm text-blue-600">{caterer.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(caterer._id || caterer.id)}
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