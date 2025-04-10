// src/pages/MusicDetail.tsx
import { useParams } from "react-router-dom";
import { musicDanceCategories } from "../data/musicDanceCategories";

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
    <div className="max-w-5xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <img
          src={music.image}
          alt={music.title}
          className="w-full h-96 object-cover rounded-xl shadow-md"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-bold text-primary mb-4">{music.title}</h1>
        <p className="text-gray-700 mb-6 text-lg">{music.description}</p>
        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MusicDetail;
