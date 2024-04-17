import { createBrowserRouter } from "react-router-dom";
import Login from "src/screens/Users/Login/index";
import Home from "src/screens/Users/Home/index";
import Profile from "src/screens/Users/Profile/index";
import LayoutPage from "src/screens/Users/Layout/index";
import SignUp from "src/screens/Users/SignUp";

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
    path: "/",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

export default router;
