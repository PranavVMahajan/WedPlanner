import { useNavigate } from "react-router-dom";

const photographers = [
    {
      id: "pixel-studio",
      name: "Pixel Studio",
      description: "Creative photography for weddings & events.",
      image: "https://images.unsplash.com/photo-1583878545126-2f1ca0142714?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "light-capture",
      name: "Light Capture Studio",
      description: "Modern and stylish wedding captures.",
      image: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "flashframe",
      name: "FlashFrame Studio",
      description: "Elegant moments with every click.",
      image: "https://images.unsplash.com/photo-1647949940712-bfcf82015d9b?q=80&w=2025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "lens-art",
      name: "LensArt Photography",
      description: "Bringing your wedding story to life.",
      image: "https://images.unsplash.com/photo-1583878544826-8f8c418033ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "clicks-and-smiles",
      name: "Clicks & Smiles",
      description: "Candid wedding moments beautifully captured.",
      image: "https://images.unsplash.com/photo-1587271511223-18b7ef9a327a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "dreamshots",
      name: "DreamShots Studio",
      description: "Turning dreams into frames.",
      image: "https://images.unsplash.com/photo-1735052709798-2abcc8c0d6e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  

const PhotographerList = () => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/services/photographer/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-primary">Our Photographers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {photographers.map((photographer) => (
          <div
            key={photographer.id}
            onClick={() => handleClick(photographer.id)}
            className="cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 bg-white"
          >
            <img
              src={photographer.image}
              alt={photographer.name}
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{photographer.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{photographer.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotographerList;
