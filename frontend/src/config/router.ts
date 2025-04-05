import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage/index";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgetPage";
import ServicePage from "../pages/ServicePage/ServiceDetail"; // ✅ Your service page
import ServiceDetail from "../pages/ServicePage/ServiceDetail";
import PhotographerList from "../pages/ServicePage/PhotographerList";
import PhotographerDetail from "../pages/ServicePage/PhotographerDetail";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '',
        Component: HomePage,
      },
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'register',
        Component: RegisterPage,
      },
      {
        path: 'forgot',
        Component: ForgotPasswordPage,
      },
      {
        path: 'services/:serviceId', // ✅ route for the service page
        Component: ServiceDetail,
      },
      {
        path: 'services/photographer', // 👈 New route for listing 6 photographer studios
        Component: PhotographerList,
      },
      { path: 'services/photographer/:photographerId', Component: PhotographerDetail },
    ],
  },
]);
