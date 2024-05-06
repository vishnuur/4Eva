import axios from "axios";
import { BASE_URL } from "src/config/app.const";

//const baseURL =
//  import.meta.env.MODE === "development"
//    ? import.meta.env.VITE_baseURL
//    : import.meta.env.VITE_baseQAURL;
// const baseURL = import.meta.env.VITE_baseURL;
// const baseURL = import.meta.env.VITE_BASE_URL;
const baseURL = BASE_URL;
const token = localStorage.getItem("userToken");

const base = async (options: any, headerOptions: any) => {
  try {
    return axios({
      baseURL,
      headers: {
        Authorization: options?.token ? `Bearer ${token}` : null,
        ...headerOptions,
      },
      ...options,
    }).then((res) => res.data);
  } catch (error: any) {
    console.log(error);
  }
};

export const get = (url: string, params?: any) => {
  const options = {
    method: "get",
    url,
    params,
  };
  return base(options, null);
};
export const patch = (url: string, data: any) => {
  const options = {
    method: "patch",
    url,
    data,
  };
  return base(options, null);
};
export const post = (url: string, data: any, headerOptions?: any) => {
  const options = {
    method: "post",
    url,
    data,
  };
  return base(options, headerOptions);
};

export const put = (url: string, data: any) => {
  const options = {
    method: "put",
    url,
    data,
  };
  return base(options, null);
};

export const del = (url: string, data: any) => {
  const options = {
    method: "delete",
    url,
    data,
  };
  return base(options, null);
};
