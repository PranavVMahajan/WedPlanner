import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage/index";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgetPage";

export const router = createBrowserRouter([
    {
        path:'/',
        Component:App,
        children:[
            {
                path:'',
                Component:HomePage
            },
            {
                path:'login',
                Component:LoginPage
            },
            {
                path:'register',
                Component:RegisterPage
            },
            {
                path:'forgot',
                Component:ForgotPasswordPage
            }
        ]
        
    }
]);