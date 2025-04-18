// src/pages/MusicDetail.tsx
import { useParams } from "react-router-dom";
import { musicDanceCategories } from "../data/musicDanceCategories";
import { Link } from "react-router-dom";

const MusicDetail = () => {
  const { musicName } = useParams<{ musicName?: string }>();

  if (!musicName) {
    return (
      <div className="text-center text-2xl text-red-600 py-10">
        Invalid Music Service
      </div>
    );
  }

  const decodedName = decodeURIComponent(musicName);
  const music = musicDanceCategories.find(
    (item) => item.title === decodedName
  );

  if (!music) {
    return (
      <div className="text-center text-2xl text-red-600 py-10">
        Music Service Not Found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">
        Available Providers for {music.title}
      </h1>

      {music.shops && music.shops.length > 0 ? (
        <div className="mt-8 space-y-8">
          {music.shops.map((shop, index) => (
            <Link
              key={index}
              to={`/music/${music.title}/${encodeURIComponent(shop.name)}`}
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
                  <h2 className="text-xl font-semibold text-gray-800">
                    {shop.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{shop.location}</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Starting from ₹{shop.price}</li>
                    <li>Professional Artists</li>
                    <li>Highly Rated</li>
                  </ul>
                </div>

                <div className="text-sm text-green-600 font-semibold mt-4">
                  Verified & Trusted
                </div>
              </div>

              {/* Price Block */}
              <div className="text-right min-w-[140px] flex flex-col justify-between">
                <div>
                  <p className="text-xl font-bold text-green-600">
                    ₹{shop.price}
                  </p>
                  <p className="text-sm line-through text-gray-400">
                    ₹{shop.price + 1500}
                  </p>
                  <p className="text-sm text-green-500">Special Offer</p>
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center text-xs text-blue-600 font-semibold">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
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
          No providers available for this service.
        </p>
      )}
    </div>
  );
};

export default MusicDetail;
