import { useNavigate } from "react-router-dom";

const caterers = [
  {
    id: "royal-feast",
    name: "Royal Feast Caterers",
    description: "Lavish menus for royal weddings.",
    image: "https://images.unsplash.com/photo-1604909053195-74e0497b1b3f",
  },
  {
    id: "taste-buds",
    name: "Taste Buds Catering",
    description: "Flavors from all over India on one plate.",
    image: "https://images.unsplash.com/photo-1576402187873-efbdd2112b46",
  },
  {
    id: "urban-bites",
    name: "Urban Bites",
    description: "Trendy and modern culinary experiences.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
  },
  {
    id: "grand-banquet",
    name: "Grand Banquet Services",
    description: "Perfect for large and luxurious wedding parties.",
    image: "https://images.unsplash.com/photo-1613145998434-c1a2334c30db",
  },
  {
    id: "flavor-fiesta",
    name: "Flavor Fiesta",
    description: "Fusion food and artistic presentation.",
    image: "https://images.unsplash.com/photo-1625940846150-c7c9b3897c67",
  },
  {
    id: "heritage-thali",
    name: "Heritage Thali",
    description: "Authentic Indian regional thalis with tradition.",
    image: "https://images.unsplash.com/photo-1589307000270-ccb24650d430",
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
