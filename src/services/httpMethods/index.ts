import axios from "axios";

//const baseURL =
//  import.meta.env.MODE === "development"
//    ? import.meta.env.VITE_baseURL
//    : import.meta.env.VITE_baseQAURL;
// const baseURL = import.meta.env.VITE_baseURL;
// const baseURL = import.meta.env.VITE_BASE_URL;
const baseURL = "http://103.154.184.45:3010/";

const base = async (options: any, headerOptions: any) => {
  try {
    return axios({
      baseURL,
      headers: {
        //Authorization: token ? `Bearer ${token}` : null,
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
