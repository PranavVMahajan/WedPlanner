'use client';
import { useState, useEffect } from 'react';

interface Contact {
  phone: string;
  email: string;
  address: string;
  _id?: string;
}

interface VenueForm {
  _id?: string;
  id?: string;
  title: string;
  shortDescription: string;
  description: string;
  cost: string;
  image: string;
  bg: string;
  contact: Contact;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface ApiResponse {
  success: boolean;
  data: VenueForm[] | VenueForm;
  message?: string;
}

export default function AdminVenue() {
  const initialFormState: VenueForm = {
    title: '',
    shortDescription: '',
    description: '',
    cost: '',
    image: '',
    bg: 'bg-pink-100',
    contact: {
      phone: '',
      email: '',
      address: '',
    },
  };

  const [form, setForm] = useState<VenueForm>(initialFormState);
  const [venues, setVenues] = useState<VenueForm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'add' | 'delete' | 'view'>('add');

  useEffect(() => {
    const fetchVenues = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('http://localhost:1213/api/venues');
        const data: ApiResponse = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch venues');
        }

        if (data.success && Array.isArray(data.data)) {
          setVenues(data.data);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching venues:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (['phone', 'email', 'address'].includes(name)) {
      setForm(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [name]: value,
        },
      }));
    } else {
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
      const formWithId = {
        ...form,
        id: form.id || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      };

      const res = await fetch('http://localhost:1213/api/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formWithId),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to create venue');
      }

      setVenues(prev => [...prev, data.data as VenueForm]);
      setForm(initialFormState);
      setSuccessMessage('Venue added successfully!');
    } catch (err) {
      console.error('Error creating venue:', err);
      setError(err instanceof Error ? err.message : 'Failed to add venue. Please check your data and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch(`http://localhost:1213/api/venues/${id}`, {
        method: 'DELETE',
      });

      const data: ApiResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete venue');
      }

      setVenues(prev => prev.filter(venue => venue._id !== id));
      setSuccessMessage('Venue deleted successfully!');
    } catch (err) {
      console.error('Error deleting venue:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">Venue Management</h1>

      <div className="flex justify-center mb-8">
        <div className="flex border rounded-md overflow-hidden">
          <button
            className={`px-6 py-2 ${activeTab === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('add')}
          >
            Add Venue
          </button>
          <button
            className={`px-6 py-2 ${activeTab === 'view' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('view')}
          >
            View Venues
          </button>
          <button
            className={`px-6 py-2 ${activeTab === 'delete' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('delete')}
          >
            Delete Venue
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      {activeTab === 'add' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Venue Title"
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">URL ID (optional)</label>
              <input
                type="text"
                name="id"
                value={form.id || ''}
                onChange={handleChange}
                placeholder="Will be auto-generated from title"
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Short Description</label>
              <input
                type="text"
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="Short Description"
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Background Color Class</label>
              <input
                type="text"
                name="bg"
                value={form.bg}
                onChange={handleChange}
                placeholder="e.g., bg-pink-100"
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Full Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Full Description"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Cost</label>
              <input
                type="text"
                name="cost"
                value={form.cost}
                onChange={handleChange}
                placeholder="e.g., ₹30L - ₹1.5Cr"
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Image URL</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.contact.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.contact.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={form.contact.address}
              onChange={handleChange}
              placeholder="Address"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-400"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Add Venue'}
          </button>
        </form>
      )}

      {activeTab === 'view' && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">All Venues</h2>
          {venues.length === 0 ? (
            <p className="text-center text-gray-500">No venues found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <div key={venue._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {venue.image && (
                    <img 
                      src={venue.image} 
                      alt={venue.title} 
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
                      }}
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{venue.title}</h3>
                    <p className="text-gray-600">{venue.shortDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'delete' && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">Delete Venues</h2>
          {venues.length === 0 ? (
            <p className="text-center text-gray-500">No venues found.</p>
          ) : (
            <ul className="space-y-4">
              {venues.map((venue) => (
                <li key={venue._id} className="p-4 bg-white rounded-md shadow-md flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    {venue.image && (
                      <img 
                        src={venue.image} 
                        alt={venue.title} 
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=No+Image';
                        }}
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-medium">{venue.title}</h3>
                      <p className="text-gray-600">{venue.shortDescription}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(venue._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 disabled:bg-red-400"
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}