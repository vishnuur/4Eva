import { createBrowserRouter } from "react-router-dom";
import Login from "src/screens/Users/Login/index";
import Home from "src/screens/Users/Home/index";
import Profile from "src/screens/Users/Profile/index";
import LayoutPage from "src/screens/Users/Layout/index";
import SignUp from "src/screens/Users/SignUp";
import AdminDashboard from "src/screens/Admin/Dashboard";
import AdminLayout from "src/screens/Admin/Layout";
import AdminLogin from "src/screens/Admin/AdminLogin";

const router = createBrowserRouter([
  {
    element: <LayoutPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <SignUp />,
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
]);

export default router;
