import { useNavigate } from "react-router-dom";

const photographers = [
    {
      id: "pixel-studio",
      name: "Pixel Studio",
      description: "Creative photography for weddings & events.",
      image: "https://images.unsplash.com/photo-1542315192-1a66b6a5c4b5",
    },
    {
      id: "light-capture",
      name: "Light Capture Studio",
      description: "Modern and stylish wedding captures.",
      image: "https://images.unsplash.com/photo-1520639888714-7b11140c2592",
    },
    {
      id: "flashframe",
      name: "FlashFrame Studio",
      description: "Elegant moments with every click.",
      image: "https://images.unsplash.com/photo-1530023367847-a683933f417a",
    },
    {
      id: "lens-art",
      name: "LensArt Photography",
      description: "Bringing your wedding story to life.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    },
    {
      id: "clicks-and-smiles",
      name: "Clicks & Smiles",
      description: "Candid wedding moments beautifully captured.",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    },
    {
      id: "dreamshots",
      name: "DreamShots Studio",
      description: "Turning dreams into frames.",
      image: "https://images.unsplash.com/photo-1582719478148-97053855234c",
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
