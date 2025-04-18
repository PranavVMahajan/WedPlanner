import { Navigate, Outlet } from 'react-router-dom';

// This component will be used to protect routes
const PrivateRoute = () => {
  const token = localStorage.getItem('token'); // Check if the token is available in localStorage

  if (!token) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // If authenticated, allow access to the route
  return <Outlet />;
};

export default PrivateRoute;
