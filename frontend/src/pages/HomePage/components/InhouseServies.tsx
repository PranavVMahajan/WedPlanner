import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

interface Service {
  _id: string;
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const InhouseServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:1213/api/inhouseServices");
        const servicesData = response.data.data || [];
        setServices(servicesData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch services");
        setLoading(false);
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="w-[80%] mx-auto py-10">Loading services...</div>;
  }

  if (error) {
    return <div className="w-[80%] mx-auto py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="w-[80%] mx-auto py-10">
      <div className="text-2xl font-bold py-10 text-primary">Inhouse Services</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
        {services.map((service) => (
          <Card key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ service }: { service: Service }) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/services/${service.id}`);
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="card w-full cursor-pointer transition-all duration-300"
    >
      <div className="img rounded-lg overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className={`w-full h-60 object-cover transition-transform duration-300 ${isHover ? 'scale-110' : ''}`}
        />
      </div>
      <h1 className="text-center font-semibold text-xl mt-4">{service.title}</h1>
      <p className="text-center text-gray-600">{service.description}</p>
      <div className="flex justify-center items-center py-5">
        <button
          onClick={handleClick}
          className="py-2 px-5 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-all duration-300"
        >
          Know More
        </button>
      </div>
    </div>
  );
};

export default InhouseServices;