import { Link } from 'react-router-dom';

const categories = [
  {
    title: "Sangeet Choreographers",
    image: "https://images.unsplash.com/photo-1718946918946-f4fa72f6abec?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    locations: ["Baner", "Pune"],
    link: "/dance/sangeet",
  },
  {
    title: "Wedding Bands",
    image: "https://images.unsplash.com/photo-1537215685160-2496ed0c0aed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    locations: ["Kalyani Nagar", "Pune"],
    link: "/music/bands",
  },
  {
    title: "DJ & Music Artists",
    image: "https://images.unsplash.com/photo-1657857540803-0d6a88dbb8e2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    locations: ["Koregaon Park", "Pune"],
    link: "/music/dj",
  },
];

const PopularDanceMusic = () => {
  return (
    <div className="w-[90%] max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-primary mb-6 font-[PoppinsRegular]">Popular Dance & Music Options</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((item, index) => (
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
              <Link to={item.link} className="text-sm text-primary underline hover:text-primary/80">
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
