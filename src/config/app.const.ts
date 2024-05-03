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

export const dataValidation = (value: string) => {
  if (value) {
    return value;
  } else {
    return "Not available";
  }
};

export function convertToFeetAndInches(heightStr: string) {
  try {
    const [feet, inches] = heightStr.split(".").map(parseFloat);
    return `${feet}ft ${inches}in`;
  } catch (error) {
    // If no decimal point, assume it's just feet
    const feet = parseFloat(heightStr);
    return `${feet}ft 0in`;
  }
}

export const SUCCESS = "success";
export const ERROR = "error";

export const BASE_URL = "http://103.154.184.45:3010/"; //dev base URL
// export const BASE_URL = "https://103.154.184.45:3020/"; //prod base URL
export const IMG_BASE_URL = "http://103.154.184.45:82/forEva/";
// export const IMG_BASE_URL = "https://103.154.184.45:82/forEva/";
