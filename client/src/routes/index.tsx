import { createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  Home,
  Layout,
  Login,
  Profile,
  Register,
  ForgotPassword,
  ResetPassword,
} from "../screens";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const FORGOTPASSWORD = "/forgot-password";
export const RESETPASSWORD = "/reset-password";

export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";
export const PROFILE = "/protected/profile";

export const router = createBrowserRouter([
  { path: ROOT, element: <Home /> },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  { path: FORGOTPASSWORD, element: <ForgotPassword /> },
  { path: RESETPASSWORD, element: <ResetPassword /> },
  {
    path: PROTECTED,
    element: <Layout />,
    children: [
      {
        path: DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: PROFILE,
        element: <Profile />,
      },
    ],
  },
]);
