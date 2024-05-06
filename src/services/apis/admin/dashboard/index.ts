import { post } from "src/services/httpMethods";

export const adminListProfiles = (payload: any) => {
  try {
    const result = post("forEva/listProfile", { ...payload, token: true });
    return result;
  } catch (er) {
    console.log(er);
  }
};
