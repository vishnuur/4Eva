import { post } from "src/services/httpMethods";

export const userRegisterAPI = (payload: any) => {
  try {
    const result = post("/auth/register", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};

export const userLoginAPI = (payload: any) => {
  try {
    const result = post("/auth/login", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};
