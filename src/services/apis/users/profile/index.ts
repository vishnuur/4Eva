import { post } from "src/services/httpMethods";

export const saveProfileDetails = (payload: any) => {
  try {
    const result = post("/profile/createProfile", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};
export const saveBasicDetailsAPI = (payload: any) => {
  try {
    const result = post("/profile/insertUpdateBasicInfo", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};
export const saveContactDetailsAPI = (payload: any) => {
  try {
    const result = post("/profile/insertUpdateContactInfo", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};
export const saveEducationDetailAPI = (payload: any) => {
  try {
    const result = post("/profile/insertUpdateEducationInfo", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};
export const saveEmailInfoAPI = (payload: any) => {
  try {
    const result = post("/profile/insertUpdateEmailInfo", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};
export const saveFamilyInfoAPI = (payload: any) => {
  try {
    const result = post("/profile/insertUpdateFamilyInfo", payload);
    return result;
  } catch (er) {
    console.log(er);
  }
};
export const saveLocationInfoAPI = (payload: any) => {
  try {
    const result = post("/profile/insertUpdateLocationInfo", payload);
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
