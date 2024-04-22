import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import authStore from "./store/users/auth";

const localUserId = localStorage.getItem("userId");
function App() {
  const { setUserId } = authStore((state) => state);

  useEffect(() => {
    setUserId(localUserId);
  }, [localUserId]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
