import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage/index";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgetPage";
import ServiceDetail from "../pages/ServicePage/ServiceDetail";
import PhotographerList from "../pages/ServicePage/PhotographerList";
import PhotographerDetail from "../pages/ServicePage/PhotographerDetail";
import CatererList from "../pages/ServicePage/CatererList";
import CatererDetail from "../pages/ServicePage/CatererDetail";

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
        path: 'services/:serviceId',
        Component: ServiceDetail,
      },
      {
        path: 'services/photographer',
        Component: PhotographerList,
      },
      {
        path: 'services/photographer/:photographerId',
        Component: PhotographerDetail,
      },
      {
        path: 'services/caterer', // 👈 Route for listing caterers
        Component: CatererList,
      },
      {
        path: 'services/caterer/:id',
        Component: CatererDetail,
      },      
    ],
  },
]);
