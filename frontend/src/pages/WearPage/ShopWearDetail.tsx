import { useParams } from "react-router-dom";

const groomWearImages = [
    {
      id: "royalsherwani",
      title: "Royal Sherwani",
      image: "https://images.unsplash.com/photo-1681717055630-c62333c22fec?q=80&w=1974",
      description: "A luxurious royal sherwani made of silk and embroidered...",
      size: ["S", "M", "L", "XL"],
      price: 8999,
      shops: [
        {
          name: "Royal Threads",
          location: "Mumbai",
          rent: 1500,
          buy: 8999,
          image: "https://images.unsplash.com/photo-1681717055630-c62333c22fec?q=80&w=1974"
        },
        {
          name: "Groom's Glory",
          location: "Delhi",
          rent: 1800,
          buy: 9200,
          image: "https://i.pinimg.com/564x/42/94/d5/4294d57d2bd1ea07e6f59bb0574a3434.jpg"
        },
        {
          name: "Wedding Vogue",
          location: "Bangalore",
          rent: 1700,
          buy: 9100,
          image: "https://i.pinimg.com/564x/1a/c8/6e/1ac86eb3f258a785f36a9d74b351b3b3.jpg"
        }
      ]
    },
    {
      id: "designerachkan",
      title: "Designer Achkan",
      image: "https://i.pinimg.com/736x/15/7c/9f/157c9fc5e197a6d70e18c858f157895a.jpg",
      description: "Modern Achkan with designer cuts...",
      size: ["M", "L"],
      price: 7499,
      shops: [
        {
          name: "Ethnic Edge",
          location: "Hyderabad",
          rent: 1400,
          buy: 7499,
          image: "https://i.pinimg.com/564x/b9/72/1d/b9721d5e4abfc79ff7208411e1bbf7a3.jpg"
        },
        {
          name: "Prince Wear",
          location: "Ahmedabad",
          rent: 1300,
          buy: 7650,
          image: "https://i.pinimg.com/564x/c4/01/56/c40156a317fb8cfd0b589bb1bfa5a8c2.jpg"
        }
      ]
    },
    {
      id: "bridallehenga",
      title: "Bridal Lehenga",
      image: "https://i.pinimg.com/736x/b4/51/0c/b4510ca9cbb9457c76c6443a9d89552d.jpg",
      description: "Exquisite bridal lehenga in rich maroon...",
      size: ["S", "M"],
      price: 12999,
      shops: [
        {
          name: "Bridal Studio",
          location: "Pune",
          rent: 3000,
          buy: 12999,
          image: "https://i.pinimg.com/564x/9f/cc/f2/9fccf2d7887d8eb61a0d084f1bde4f24.jpg"
        },
        {
          name: "Dulhan Dresses",
          location: "Chennai",
          rent: 2800,
          buy: 13200,
          image: "https://i.pinimg.com/564x/f9/f6/f5/f9f6f5f3b6f52a7b401eead7c8ff1e6b.jpg"
        }
      ]
    },
    {
      id: "traditionalredsaree",
      title: "Traditional Red Saree",
      image: "https://i.pinimg.com/736x/a1/e8/31/a1e8312e333712736a5f30431d1682b5.jpg",
      description: "Classic red saree with golden border...",
      size: ["Free Size"],
      price: 4999,
      shops: [
        {
          name: "Silk Saga",
          location: "Kolkata",
          rent: 900,
          buy: 4999,
          image: "https://i.pinimg.com/564x/f0/9f/3c/f09f3c2dcb72798bcfae91b43ef34765.jpg"
        },
        {
          name: "Saree Palace",
          location: "Nagpur",
          rent: 800,
          buy: 5100,
          image: "https://i.pinimg.com/564x/74/e3/d4/74e3d4a2e9f7f6fc5c4a9c63ebf3d4b1.jpg"
        }
      ]
    }
  ];

const ShopWearDetail = () => {
  const { wearName, shopName } = useParams();
  const wear = groomWearImages.find((item) => item.id === wearName);
  const shop = wear?.shops.find((s) => s.name.toLowerCase() === shopName?.toLowerCase());

  if (!wear || !shop) {
    return (
      <div className="text-center text-2xl text-red-500 py-10">
        Shop or Wear Not Found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{wear.title}</h1>
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        <img
          src={shop.image || wear.image}
          alt={shop.name}
          className="w-full md:w-64 h-auto object-cover rounded-lg"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{shop.name}</h2>
          <p className="text-sm text-gray-500 mb-2">{shop.location}</p>
          <p className="text-gray-700 mb-4">{wear.description}</p>
          <p className="text-lg font-semibold text-green-600 mb-2">Price: ₹{shop.buy}</p>
          <p className="text-sm mb-2"><strong>Available Sizes:</strong> {wear.size.join(", ")}</p>
          <button className="mt-4 px-6 py-2 bg-primary text-white font-semibold rounded hover:bg-primary/90">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopWearDetail;
