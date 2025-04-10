// src/pages/MusicList.tsx
import { Link } from "react-router-dom";
import { musicDanceCategories } from "../data/musicDanceCategories";

const MusicList = () => {
  return (
    <div className="w-[90%] max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">All Music & Dance Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {musicDanceCategories.map((item) => (
          <Link to={`/music/${encodeURIComponent(item.title)}`} key={item.title}>
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
              <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MusicList;
