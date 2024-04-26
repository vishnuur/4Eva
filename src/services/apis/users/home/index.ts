import { post } from "src/services/httpMethods";

export const getUsersList = (payload: any) => {
  try {
    const result = post("/search/listProfile", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};

