import { Link } from 'react-router-dom';
import { musicDanceCategories } from '../../data/musicDanceCategories';

const PopularDanceMusic = () => {
  return (
    <div className="w-[90%] max-w-6xl mx-auto py-10">
      <Link to="/music">
        <h1 className="text-3xl font-bold text-primary mb-6 font-[PoppinsRegular] hover:underline cursor-pointer">
          Popular Dance & Music Options
        </h1>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {musicDanceCategories.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
              <ul className="flex flex-wrap gap-2 text-primary text-sm mb-3">
                {item.locations.map((loc, i) => (
                  <li key={i} className="bg-primary/10 px-2 py-1 rounded-md">{loc}</li>
                ))}
              </ul>
              <Link
                to={`/music/${encodeURIComponent(item.title)}`}
                className="text-sm text-primary underline hover:text-primary/80"
              >
                Explore All Locations
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDanceMusic;
