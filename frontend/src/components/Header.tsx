import { Link } from "react-router";

const Header = () => {
  return (
    <header className="body-font bg-primary text-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">Tailblocks</span>
        </Link>

        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <Link to="/services" className="mr-5 hover:text-gray-300">
            Services
          </Link>
          <Link to="/about" className="mr-5 hover:text-gray-300">
            About
          </Link>
          <Link to="/gallery" className="mr-5 hover:text-gray-300">
            Gallery
          </Link>
          <Link to="/contact" className="mr-5 hover:text-gray-300">
            Contact
          </Link>
        </nav>

        <Link to="/login" className="bg-black/10 px-7 py-2 rounded-2xl text-white hover:bg-black/20 transition">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
