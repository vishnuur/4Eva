import { Image } from "antd";
import "./index.scss";
import profileStore from "src/store/users/profile";
import DefaultProfile from "../../../../../assets/profile.jpg";

import { useEffect, useState } from "react";
import EducationalInfo from "./Components/Tabs/educationalInfo";
import BasicInfo from "./Components/Tabs/basicInfo";
import FamilyInfoTab from "./Components/Tabs/familyInfo";
import ContactInfoTab from "./Components/Tabs/contactInfo";
import { IMG_BASE_URL, SUCCESS } from "src/config/app.const";
import authStore from "src/store/users/auth";
import LoaderComponent from "src/components/LoaderComponent";
import { useParams } from "react-router-dom";
import moment from "moment";
import ImageGalleryComponent from "./Components/imageGallery";
import { TbBoxMultiple } from "react-icons/tb";
import { FaCopy } from "react-icons/fa";
import { customToast } from "src/components/Toast";
import CustomFooter from "src/components/CustomFooter";

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
  const [galleryVisible, setgalleryVisible] = useState(false);

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

  const getImageIndex = () => {
    let imageIndex = 1;
    if (usersDetails?.imageInfo === null) {
      imageIndex = 1;
    } else {
      if (usersDetails?.imageInfo?.image2 !== null) {
        imageIndex = 2;
      }
      if (usersDetails?.imageInfo?.image3 !== null) {
        imageIndex = 3;
      }
      if (usersDetails?.imageInfo?.image4 !== null) {
        imageIndex = 4;
      }
    }
    return imageIndex;
  };

  const profileImage = usersDetails?.imageInfo?.image
    ? `${IMG_BASE_URL}${usersDetails?.imageInfo?.image}`
    : DefaultProfile;

  return isLoading ? (
    <LoaderComponent />
  ) : (
    <div>
      <div className="profile-wrap-user">
        <div className="profile-photo">
          <div className="profile-photo-wrap">
            <Image
              src={profileImage}
              preview={{
                destroyOnClose: true,
                imageRender: () =>
                  usersDetails?.imageInfo?.image2 ? (
                    <ImageGalleryComponent
                      setVisible={setgalleryVisible}
                      isVisible={true}
                      images={usersDetails?.imageInfo}
                    />
                  ) : (
                    <img style={{ width: "480px" }} src={profileImage} />
                  ),
                toolbarRender: () => null,
              }}
            />
            {getImageIndex() !== 1 && (
              <span className="image-count">
                <TbBoxMultiple />
                <p>{getImageIndex()}</p>
              </span>
            )}
          </div>

          <div className="my-details">
            <div className="profile-details">
              <h1>{usersDetails?.registerInfo?.name}</h1>
              <p className="profile-id">
                Profile ID :
                <span>
                  {usersDetails?.registerInfo?.loginProfileId}
                  <FaCopy
                    onClick={() => {
                      navigator.clipboard.writeText(
                        usersDetails?.registerInfo?.loginProfileId
                      );
                      customToast(SUCCESS, "Profile ID Copied to Clipboard");
                    }}
                  />
                </span>
              </p>
              <p>
                {moment().diff(usersDetails?.basicInfo?.dob, "years")} Years
              </p>
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
        <ImageGalleryComponent
          setVisible={setgalleryVisible}
          isVisible={galleryVisible}
          images={usersDetails?.imageInfo}
        />
      </div>
      <CustomFooter />
    </div>
  );
}
