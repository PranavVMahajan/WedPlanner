import { useParams } from "react-router-dom";

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

  const WearDetail = () => {
    const { wearName  } = useParams();
    const wear = groomWearImages.find((item) => item.id === wearName );
  
    if (!wear) {
      return <div className="text-center text-2xl text-red-500 py-10">Wear Not Found</div>;
    }
  
    return (
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <img
            src={wear.image}
            alt={wear.title}
            className="rounded-xl w-full h-[420px] object-cover shadow-lg"
          />
        </div>
  
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-primary mb-4">{wear.title}</h1>
          <p className="text-gray-700 text-lg mb-4">{wear.description}</p>
          <p className="mb-2 text-lg"><strong>Sizes:</strong> {wear.size.join(", ")}</p>
          <p className="text-2xl font-bold text-green-600 mb-6">₹{wear.price}</p>
  
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition">
            Buy Now
          </button>
        </div>
      </div>
    );
  };
  
  export default WearDetail;
  
