import { useState } from "react";
import { useNavigate } from "react-router";

const services = [
  {
    id: "photographer",
    title: "Pixel Perfect Photography",
    description: "Capturing memories with style",
    image: "https://image.wedmegood.com/resized-nw/570X/uploads/wmg_services/genie_dweb.jpg"
  },
  {
    id: "caterer",
    title: "Delicious Catering",
    description: "Tasty food for your events",
    image: "https://images.unsplash.com/photo-1680359873864-43e89bf248ac?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "mehendi",
    title: "Elegant Mehendi Artists",
    description: "Beautiful designs for every bride",
    image: "https://plus.unsplash.com/premium_photo-1661862397518-8e50332b6e97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "decorations",
    title: "Royal Decorations",
    description: "Stunning decor setups",
    image: "https://images.unsplash.com/photo-1737236118342-d4c175bf0814?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const InhouseServices = () => {
  return (
    <div className="w-[80%] mx-auto py-10">
      <div className="text-2xl font-bold py-10 text-primary">Inhouse Services</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
        {services.map((service, i) => (
          <Card key={i} service={service} />
        ))}
      </div>
    </div>
  );
};

export default InhouseServices;

const Card = ({ service }: { service: typeof services[0] }) => {
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
