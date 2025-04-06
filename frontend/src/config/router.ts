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
import MehendiList from "../pages/ServicePage/MehendiList";
import MehendiDetail from "../pages/ServicePage/MehendiDetail";
import DecorationList from "../pages/ServicePage/DecorationList"; // ✅ Import
import DecorationDetail from "../pages/ServicePage/DecorationDetail"; // ✅ Import

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
        path: 'services/caterer',
        Component: CatererList,
      },
      {
        path: 'services/caterer/:id',
        Component: CatererDetail,
      },
      {
        path: 'services/mehendi',
        Component: MehendiList,
      },
      {
        path: 'services/mehendi/:id',
        Component: MehendiDetail,
      },
      {
        path: 'services/decorations', // ✅ Decoration list route
        Component: DecorationList,
      },
      {
        path: 'services/decorations/:id', // ✅ Decoration detail route
        Component: DecorationDetail,
      },
    ],
  },
]);
