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
import About from "../pages/AboutPage/About";
import Contact from "../pages/ContactPage/Contact";
import Gallery from "../pages/GalleryPage/Gallery";
import VenueDetails from "../pages/VenueDetailsPage/VenueDetails";
import InhouseServices from "../pages/HomePage/components/InhouseServies";
import WearList from "../pages/WearPage/WearList";
import WearDetail from "../pages/WearPage/WearDetail";
import ShopWearDetail from "../pages/WearPage/ShopWearDetail";
import MusicList from "../pages/MusicPage/MusicList";
import MusicDetail from "../pages/MusicPage/MusicDetail";
import Admin from "../pages/AdminPage/Admin";
import PrivateRoute from "../pages/PrivateRoute/PrivateRoute";

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
        path: 'about',
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "gallery",
        Component: Gallery,
      },
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'admin',
        Component: LoginPage, // Redirect to login page first
      },
      {
        path: 'admin/dashboard',
        Component: PrivateRoute, // This route is protected after successful login
        children: [
          {
            path: '', // This means /admin/dashboard
            Component: Admin, // Your protected component
          },
        ],
      },
      {
        path: 'register',
        Component: RegisterPage,
      },
      {
        path: '/services',
        Component: InhouseServices,
      },
      {
        path: 'forgot',
        Component: ForgotPasswordPage,
      },
      {
        path: 'venue/:venueName',
        Component: VenueDetails,
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
      {
        path: 'wears',
        Component: WearList,
      },
      {
        path: 'wears/:wearName',
        Component: WearDetail,
      },
      {
        path: 'wears/:wearName/:shopName',
        Component: ShopWearDetail, // You'll create this next
      },
      {
        path: "music",
        Component: MusicList,
      },
      {
        path: "music/:musicName",
        Component: MusicDetail,
      },

    ],
  },
]);
