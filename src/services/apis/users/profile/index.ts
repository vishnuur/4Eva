import { post } from "src/services/httpMethods";

export const saveProfileDetails = (payload: any) => {
  try {
    const result = post("/profile/createProfile", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};

export const getProfileDetailsAPI = (payload: any) => {
  try {
    const result = post("/profile/getMyProfile", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};

export const getReligionsList = () => {
  try {
    const result = post("/profile/getReligion", null);
    return result;
  } catch (er) {
    console.log(er);
  }
};

export const getCastList = (payload: any) => {
  try {
    const result = post("/profile/gerCaste", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};
