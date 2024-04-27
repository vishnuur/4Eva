import { post } from "src/services/httpMethods";

export const getUsersList = async (payload: any) => {
  try {
    const result: any = await post("/search/listProfile", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};
