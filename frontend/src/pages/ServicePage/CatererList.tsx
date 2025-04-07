import { useNavigate } from "react-router-dom";

const caterers = [
  {
    id: "royal-feast",
    name: "Royal Feast Caterers",
    description: "Lavish menus for royal weddings.",
    image: "https://images.unsplash.com/photo-1742281258189-3b933879867a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "taste-buds",
    name: "Taste Buds Catering",
    description: "Flavors from all over India on one plate.",
    image: "https://images.unsplash.com/photo-1589778655375-3e622a9fc91c?q=80&w=2031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "urban-bites",
    name: "Urban Bites",
    description: "Trendy and modern culinary experiences.",
    image: "https://images.unsplash.com/photo-1708782341026-f4877b52fee7?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "grand-banquet",
    name: "Grand Banquet Services",
    description: "Perfect for large and luxurious wedding parties.",
    image: "https://images.unsplash.com/photo-1727404679933-99daa2a7573a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "flavor-fiesta",
    name: "Flavor Fiesta",
    description: "Fusion food and artistic presentation.",
    image: "https://images.unsplash.com/photo-1588644525273-f37b60d78512?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "heritage-thali",
    name: "Heritage Thali",
    description: "Authentic Indian regional thalis with tradition.",
    image: "https://images.unsplash.com/photo-1710378776019-b731011005cd?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const CatererList = () => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/services/caterer/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {caterers.map((caterer) => (
        <div
          key={caterer.id}
          className="cursor-pointer border rounded-lg shadow hover:shadow-lg transition"
          onClick={() => handleClick(caterer.id)}
        >
          <img
            src={caterer.image}
            alt={caterer.name}
            className="rounded-t-lg w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">{caterer.name}</h3>
            <p className="text-gray-600">{caterer.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatererList;
