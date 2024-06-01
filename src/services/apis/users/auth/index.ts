import { post } from "src/services/httpMethods";

export const userRegisterAPI = async (payload: any) => {
  try {
    const result = await post("/auth/register", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};

export const userLoginAPI = async (payload: any) => {
  try {
    const result = await post("/auth/login", payload);
    return result;
  } catch (er: any) {
    console.log(er);
    return { status: false, result: er.message };
  }
};
