import { useParams } from "react-router-dom";
import { useState } from "react";

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
  const [activeTab, setActiveTab] = useState("description");

  if (!wear || !shop) {
    return (
      <div className="text-center text-2xl text-red-500 py-10">
        Shop or Wear Not Found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl shadow-lg">
        <div className="md:w-1/2">
          <img
            src={shop.image || wear.image}
            alt={shop.name}
            className="w-full h-[400px] object-cover rounded-xl border"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{wear.title}</h1>
          <p className="text-sm text-gray-500">{shop.location}</p>

          <div className="flex items-center gap-2 text-yellow-500">
            ★★★★☆ <span className="text-gray-600 text-sm">(124 ratings)</span>
          </div>

          <p className="text-green-600 font-bold text-xl">₹{shop.buy}</p>
          <p className="text-sm text-gray-600 line-through">MRP: ₹{shop.buy + 1200}</p>
          <p className="text-sm text-green-500">You save ₹{1200}!</p>

          <div>
            <label className="text-sm font-medium">Available Sizes:</label>
            <div className="flex gap-2 mt-1">
              {wear.size.map((s) => (
                <span
                  key={s}
                  className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 font-medium">
              Buy Now
            </button>
            <button className="bg-white border px-6 py-2 rounded hover:bg-gray-100 font-medium">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex gap-4 border-b mb-4">
          {["description", "sizes", "shipping", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 font-medium ${
                activeTab === tab ? "border-b-2 border-primary text-primary" : "text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "description" && (
            <p className="text-gray-700">{wear.description} This attire is perfect for weddings, receptions, and traditional functions. Fabric: Premium Silk Blend. Care: Dry Clean Only.</p>
          )}
          {activeTab === "sizes" && (
            <ul className="list-disc pl-5 text-gray-700">
              {wear.size.map((s) => (
                <li key={s}>Size {s} - In stock</li>
              ))}
            </ul>
          )}
          {activeTab === "shipping" && (
            <div className="text-gray-700">
              <p>Delivery within 3-5 business days.</p>
              <p>Free shipping for orders above ₹3000.</p>
              <p>Easy 7-day return policy.</p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="text-gray-600 italic">
              <p>No reviews yet. Be the first to review this item!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopWearDetail;
