// src/pages/ShopMusicDetail.tsx
import { useParams } from "react-router-dom";
import { musicDanceCategories } from "../data/musicDanceCategories";

const ShopMusicDetail = () => {
  const { musicName, shopName } = useParams<{
    musicName?: string;
    shopName?: string;
  }>();

  if (!musicName || !shopName) {
    return (
      <div className="text-center text-2xl text-red-600 py-10">
        Invalid Shop Details
      </div>
    );
  }

  const decodedMusicName = decodeURIComponent(musicName);
  const decodedShopName = decodeURIComponent(shopName);

  const musicCategory = musicDanceCategories.find(
    (category) => category.title === decodedMusicName
  );

  if (!musicCategory) {
    return (
      <div className="text-center text-2xl text-red-600 py-10">
        Music Category Not Found
      </div>
    );
  }

  const shop = musicCategory.shops.find(
    (s) => s.name === decodedShopName
  );

  if (!shop) {
    return (
      <div className="text-center text-2xl text-red-600 py-10">
        Shop Not Found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-primary mb-6 text-center">
        {shop.name}
      </h1>
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-xl rounded-xl p-6">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full md:w-1/2 rounded-lg object-cover"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {musicCategory.title}
          </h2>
          <p className="text-gray-600 text-sm">{musicCategory.description}</p>
          <p className="text-gray-700 font-medium">
            Location: <span className="font-normal">{shop.location}</span>
          </p>
          <p className="text-xl font-bold text-green-600">
            ₹{shop.price} <span className="line-through text-gray-400 text-base ml-2">₹{shop.price + 1500}</span>
          </p>
          <div className="text-sm text-green-600 font-semibold">Verified & Trusted</div>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Trained Professionals</li>
            <li>Customized Performances</li>
            <li>Great Customer Reviews</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShopMusicDetail;
