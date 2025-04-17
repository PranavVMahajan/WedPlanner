import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaCogs, FaSignOutAlt } from 'react-icons/fa';

const Admin = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-screen p-5">
        <div className="text-3xl text-center mb-8">
          <h1>Admin Panel</h1>
        </div>
        <ul>
          <li className="mb-4">
            <Link to="/admin/dashboard" className="flex items-center gap-3 text-lg hover:text-gray-400">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/users" className="flex items-center gap-3 text-lg hover:text-gray-400">
              <FaUser /> Manage Users
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/settings" className="flex items-center gap-3 text-lg hover:text-gray-400">
              <FaCogs /> Settings
            </Link>
          </li>
          <li className="mt-8">
            <Link to="/" className="flex items-center gap-3 text-lg hover:text-gray-400">
              <FaSignOutAlt /> Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white shadow-lg rounded-md p-6">
          <h2 className="text-2xl font-semibold mb-5">Welcome to the Admin Panel</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard Overview */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Site Overview</h3>
              <p className="text-gray-700">Quick view of the site statistics and activity.</p>
            </div>

            {/* Manage Users */}
            <div className="bg-green-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Manage Users</h3>
              <p className="text-gray-700">View and manage user accounts.</p>
            </div>

            {/* Settings */}
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Settings</h3>
              <p className="text-gray-700">Configure system settings and preferences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
