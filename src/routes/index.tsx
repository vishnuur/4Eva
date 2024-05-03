// import { createBrowserRouter } from "react-router-dom";
// import { lazy } from "react";

// const Login = lazy(() => import("src/screens/Users/Login/index"));
// const Home = lazy(() => import("src/screens/Users/Home/index"));
// const Profile = lazy(() => import("src/screens/Users/Profile"));
// const LayoutPage = lazy(() => import("src/screens/Users/Layout/index"));
// const SignUp = lazy(() => import("src/screens/Users/SignUp"));
// const AdminDashboard = lazy(() => import("src/screens/Admin/Dashboard"));

// const UserExpanded = lazy(() => import("src/screens/Admin/UserExpanded"));
// const AdminLayout = lazy(() => import("src/screens/Admin/Layout"));
// const AdminLogin = lazy(() => import("src/screens/Admin/AdminLogin"));
// const BasicInfoEdit = lazy(
//   () => import("src/screens/Users/Profile/Components/Edit/basicInfoEdit")
// );
// const FamilyInfoEdit = lazy(
//   () => import("src/screens/Users/Profile/Components/Edit/familyEdit")
// );
// const EducationalInfoEdit = lazy(
//   () => import("src/screens/Users/Profile/Components/Edit/educationalInfoEdit")
// );
// const ContactInfoEdit = lazy(
//   () => import("src/screens/Users/Profile/Components/Edit/contactInfoEdit")
// );
// const SingleUserProfile = lazy(
//   () => import("src/screens/Users/Home/Components/SingleUserProfile")
// );
// const Verification = lazy(() => import("src/screens/Users/Verification"));

// const router = createBrowserRouter([
//   {
//     element: <LayoutPage />,
//     children: [
//       {
//         path: "/home",
//         element: <Home />,
//       },
//       {
//         path: "/profile",
//         element: <Profile />,
//       },
//       { path: "/profile/edit/basic-details", element: <BasicInfoEdit /> },
//       { path: "/profile/edit/family-details", element: <FamilyInfoEdit /> },
//       {
//         path: "/profile/edit/education-details",
//         element: <EducationalInfoEdit />,
//       },
//       { path: "/profile/edit/contact-details", element: <ContactInfoEdit /> },
//       {
//         path: "/home/user-details/:profileId",
//         element: <SingleUserProfile />,
//       },
//       {
//         path: "/user-verification",
//         element: <Verification />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/",
//     element: <SignUp />,
//   },
//   {
//     element: <AdminLayout />,
//     children: [
//       {
//         path: "/admin/dashboard",
//         element: <AdminDashboard />,
//       },
//       {
//         path: "/admin/users/:userId",
//         element: <UserExpanded />,
//       },
//     ],
//   },
//   {
//     path: "/admin/login",
//     element: <AdminLogin />,
//   },
// ]);

// export default router;

import { createBrowserRouter } from "react-router-dom";
import Login from "src/screens/Users/Login/index";
import Home from "src/screens/Users/Home/index";
import Profile from "src/screens/Users/Profile/index";
import LayoutPage from "src/screens/Users/Layout/index";
import SignUp from "src/screens/Users/SignUp";
import AdminDashboard from "src/screens/Admin/Dashboard";
import UserExpanded from "src/screens/Admin/UserExpanded";
import AdminLayout from "src/screens/Admin/Layout";
import AdminLogin from "src/screens/Admin/AdminLogin";
import BasicInfoEdit from "src/screens/Users/Profile/Components/Edit/basicInfoEdit";
import FamilyInfoEdit from "src/screens/Users/Profile/Components/Edit/familyEdit";
import EducationalInfoEdit from "src/screens/Users/Profile/Components/Edit/educationalInfoEdit";
import ContactInfoEdit from "src/screens/Users/Profile/Components/Edit/contactInfoEdit";
import SingleUserProfile from "src/screens/Users/Home/Components/SingleUserProfile";
import Verification from "src/screens/Users/Verification";

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
      { path: "/profile/edit/basic-details", element: <BasicInfoEdit /> },
      { path: "/profile/edit/family-details", element: <FamilyInfoEdit /> },
      {
        path: "/profile/edit/education-details",
        element: <EducationalInfoEdit />,
      },
      { path: "/profile/edit/contact-details", element: <ContactInfoEdit /> },
      {
        path: "/home/user-details/:profileId",
        element: <SingleUserProfile />,
      },
      {
        path: "/user-verification",
        element: <Verification />,
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
      {
        path: "/admin/users/:userId",
        element: <UserExpanded />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
]);

export default router;
