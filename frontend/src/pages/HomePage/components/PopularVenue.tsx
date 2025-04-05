import { Link } from 'react-router'; // Use 'react-router-dom' instead of 'react-router'

const PopularVenue = () => {
  return (
    <div className="w-[90%] max-w-6xl mx-auto py-10">
      <h1 className="text-start text-2xl font-[PoppinsRegular] mb-6">
        Popular Venue Searches
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {
          Array(3).fill(null).map((_, i) => (
            <div key={i} className="rounded-md overflow-hidden shadow-md">
              <img
                src="https://image.wedmegood.com/resized/300X/uploads/option_image/64/lawn-farm-house.jpg"
                alt="Venue"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-white">
                <h2 className="text-lg font-semibold mb-1">Banquet-halls</h2>
                <ul className="flex flex-wrap items-center gap-2 text-primary text-sm mb-2">
                  <li>KoregaonPark</li>
                  <li>Pune</li>
                </ul>
                <Link to="#" className="text-primary underline text-sm">All Locations</Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default PopularVenue;
