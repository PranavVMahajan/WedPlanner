import { useParams,Link  } from "react-router-dom";

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

const WearDetail = () => {
  const { wearName, location } = useParams();
  const wear = groomWearImages.find((item) => item.id === wearName);

  if (!wear) {
    return <div className="text-center text-2xl text-red-500 py-10">Wear Not Found</div>;
  }

  const filteredShops = location
    ? wear.shops.filter(
        (shop) =>
          shop.location?.toLowerCase() === location.toLowerCase()
      )
    : wear.shops;

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">
        Available Shops for {wear.title} {location && `in ${location}`}
      </h1>

      {filteredShops.length > 0 ? (
        <div className="mt-8 space-y-8">
          {filteredShops.map((shop, index) => (
            <Link
            key={index}
            to={`/wears/${wear.id}/${encodeURIComponent(shop.name)}`}
            className="transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl bg-white rounded-xl p-4 shadow-md min-h-[240px] flex items-stretch gap-6"
            >
              {/* Image */}
              <img
                src={shop.image}
                alt={shop.name}
                className="w-40 h-auto object-cover rounded-lg"
              />

              {/* Info Section */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{shop.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">{shop.location}</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Buy: ₹{shop.buy}</li>
                    <li>Exclusive Designs</li>
                    <li>Trusted Seller</li>
                  </ul>
                </div>

                <div className="text-sm text-green-600 font-semibold mt-4">Assured Quality</div>
              </div>

              {/* Price Block */}
              <div className="text-right min-w-[140px] flex flex-col justify-between">
                <div>
                  <p className="text-xl font-bold text-green-600">₹{shop.buy}</p>
                  <p className="text-sm line-through text-gray-400">₹{shop.buy + 2000}</p>
                  <p className="text-sm text-green-500">Special Offer</p>
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center text-xs text-blue-600 font-semibold">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                    Assured
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No shops available for this item {location && `in ${location}`}.
        </p>
      )}
    </div>
  );
};

export default WearDetail;
