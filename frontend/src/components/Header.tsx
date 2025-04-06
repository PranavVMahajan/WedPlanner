import { Link } from "react-router-dom"; // Correct import for react-router-dom

const Header = () => {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-5 py-4">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center text-white font-bold text-2xl tracking-wide"
        >
            <img
              src="https://cdn-icons-png.flaticon.com/512/8044/8044746.png" 
              className="w-10 h-10"
            />

          <span className="ml-3">Wed-Planner</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center space-x-6 text-base font-medium">
          <Link to="/services" className="hover:text-gray-300 transition">
            Services
          </Link>
          <Link to="/about" className="hover:text-gray-300 transition">
            About
          </Link>
          <Link to="/gallery" className="hover:text-gray-300 transition">
            Gallery
          </Link>
          <Link to="/contact" className="hover:text-gray-300 transition">
            Contact
          </Link>
        </nav>

        {/* Login Button */}
        <Link
          to="/login"
          className="bg-white text-primary font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
