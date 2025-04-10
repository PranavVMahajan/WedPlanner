const groomWearImages = [
  {
    id: "royalsherwani",
    title: "Royal Sherwani",
    image: "https://images.unsplash.com/photo-1681717055630-c62333c22fec?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A luxurious royal sherwani made of silk and embroidered with intricate gold threadwork. Perfect for weddings and grand celebrations.",
    size: ["S", "M", "L", "XL"],
    price: 8999,
  },
  {
    id: "designerachkan",
    title: "Designer Achkan",
    image: "https://i.pinimg.com/736x/15/7c/9f/157c9fc5e197a6d70e18c858f157895a.jpg",
    description: "Modern Achkan with designer cuts and premium buttons, tailored for regal charm and comfort.",
    size: ["M", "L"],
    price: 7499,
  },
  {
    id: "bridallehenga",
    title: "Bridal Lehenga",
    image: "https://i.pinimg.com/736x/b4/51/0c/b4510ca9cbb9457c76c6443a9d89552d.jpg",
    description: "Exquisite bridal lehenga in rich maroon, heavily embroidered for the grandest wedding day.",
    size: ["S", "M"],
    price: 12999,
  },
  {
    id: "traditionalredsaree",
    title: "Traditional Red Saree",
    image: "https://i.pinimg.com/736x/a1/e8/31/a1e8312e333712736a5f30431d1682b5.jpg",
    description: "Classic red saree with golden border — the perfect blend of tradition and elegance.",
    size: ["Free Size"],
    price: 4999,
  },
];

import { useNavigate } from "react-router-dom";

const PopularSearch = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[90%] mx-auto py-10">
      <h2
        className="text-3xl font-bold text-primary mb-2 cursor-pointer hover:underline"
        onClick={() => navigate("/wears")}
      >
        Groom & Bride Wear
      </h2>
      <p className="text-gray-600 mb-6">Explore trending outfits for both the groom and the bride.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {groomWearImages.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(`/wears/${item.id}`)}
            className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
          >
            <div className="overflow-hidden h-[260px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSearch;