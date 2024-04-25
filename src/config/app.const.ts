import { Bounce, ToastOptions } from "react-toastify";

export const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
  toastId: 1,
};

export const SUCCESS = "success";
export const ERROR = "error";
