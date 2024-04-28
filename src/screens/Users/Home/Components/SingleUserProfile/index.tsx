import {  Image } from "antd";
import "./index.scss";
import profileStore from "src/store/users/profile";
import DefaultProfile from "../../../../../assets/profile.jpg";

import { useEffect } from "react";
import EducationalInfo from "./Components/Tabs/educationalInfo";
import BasicInfo from "./Components/Tabs/basicInfo";
import FamilyInfoTab from "./Components/Tabs/familyInfo";
import ContactInfoTab from "./Components/Tabs/contactInfo";
import { IMG_BASE_URL } from "src/config/app.const";
import authStore from "src/store/users/auth";
import LoaderComponent from "src/components/LoaderComponent";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function SingleUserProfile() {
  const {
    getUsersDetails,
    getProfileDetails,
    usersDetails,
    getReligion,
    isLoading,
  } = profileStore((state) => state);
  const { userId } = authStore((state) => state);
  const { profileId } = useParams();

  useEffect(() => {
    if (profileId) {
      getUsersDetails({ registerId: profileId });
    }
    getReligion();
  }, [profileId]);

  useEffect(() => {
    if (userId) {
      getProfileDetails({ registerId: userId });
    }
  }, [userId]);

  const profileImage = usersDetails?.imageInfo?.image
    ? `${IMG_BASE_URL}${usersDetails?.imageInfo?.image}`
    : DefaultProfile;

  return isLoading ? (
    <LoaderComponent />
  ) : (
    <div className="profile-wrap-user">
      <div className="profile-photo">
        <Image
          src={profileImage}
          preview={usersDetails?.imageInfo?.image ? true : false}
        />
        <div className="my-details">
          <div className="profile-details">
            <h1>{usersDetails?.registerInfo?.name}</h1>
            <p>{moment().diff(usersDetails?.basicInfo?.dob, "years")} Years</p>
            {usersDetails?.educationInfo?.highestEducation && (
              <h5>
                {usersDetails?.educationInfo?.highestEducation},{" "}
                {usersDetails?.educationInfo?.occupation}
              </h5>
            )}
          </div>
        </div>
      </div>
      <div className="my-details">
        <div className="my-details-content">
          <BasicInfo />
          <EducationalInfo />
          <FamilyInfoTab />
          <ContactInfoTab />
        </div>
      </div>
    </div>
  );
}
