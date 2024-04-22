import { toast } from "react-toastify";
import { ERROR, SUCCESS, toastConfig } from "src/config/app.const";

export const customToast = (type: string, text: string) => {
  switch (type) {
    case SUCCESS:
      return toast.success(text, toastConfig);
    case ERROR:
      return toast.error(text, toastConfig);
    case "info":
      return toast.info(text, toastConfig);

    default:
      return toast.success(text, toastConfig);
  }
};
