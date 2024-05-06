import { post } from "src/services/httpMethods";

export const adminLoginAPI = (payload: any) => {
  try {
    const result = post("forEva/login", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};
