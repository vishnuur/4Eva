import "./App.css";
import "./image-gallery.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import authStore from "./store/users/auth";
import adminAuthStore from "./store/admin/auth";

const localUserId = localStorage.getItem("userId");
const localAuthToken = localStorage.getItem("userToken");
function App() {
  const { setUserId } = authStore((state) => state);
  const { setUserToken } = adminAuthStore((state) => state);

  useEffect(() => {
    setUserId(localUserId);
    setUserToken(localAuthToken);
  }, [localUserId, localAuthToken]);

  useEffect(() => {
    if (
      !localUserId &&
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login"
    ) {
      window.location.replace("/");
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
