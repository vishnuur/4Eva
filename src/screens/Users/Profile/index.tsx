import { Button, Image, Upload, UploadProps } from "antd";
import "./index.scss";
import profileStore from "src/store/users/profile";
import DefaultProfile from "../../../assets/profile.jpg";

import { useEffect, useState } from "react";
import EducationalInfo from "./Components/Tabs/educationalInfo";
import BasicInfo from "./Components/Tabs/basicInfo";
import FamilyInfoTab from "./Components/Tabs/familyInfo";
import ContactInfoTab from "./Components/Tabs/contactInfo";
import { UploadOutlined } from "@ant-design/icons";
import { customToast } from "src/components/Toast";
import { ERROR, IMG_BASE_URL, SUCCESS } from "src/config/app.const";
import authStore from "src/store/users/auth";
import { saveProfileImage } from "src/services/apis/users/profile";
import LoaderComponent from "src/components/LoaderComponent";
import { slide as Menu } from "react-burger-menu";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import moment from "moment";

export default function Profile() {
  const { getProfileDetails, personalDetails, getReligion, isLoading } =
    profileStore((state) => state);
  const { userId } = authStore((state) => state);
  const [menuOpen, setmenuOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      getProfileDetails({ registerId: userId });
    }
    getReligion();
  }, [userId]);

  const props: UploadProps = {
    async onChange(info: any) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const payload = {
          registerId: userId,
          image: reader.result,
        };
        if (reader.result) {
          const result = await saveProfileImage(payload);
          if (result.status) {
            customToast(SUCCESS, "Profile Photo Uploaded Successfully");
            getProfileDetails({ registerId: userId });
          } else {
            customToast(ERROR, result?.result);
          }
        }
      };
      if (info.file) {
        reader.readAsDataURL(info.file);
      }
    },
  };

  const profileImage = personalDetails?.imageInfo?.image
    ? `${IMG_BASE_URL}${personalDetails?.imageInfo?.image}`
    : DefaultProfile;

  return isLoading ? (
    <LoaderComponent />
  ) : (
    <div className="profile-wrap">
      <Menu
        isOpen={menuOpen}
        onClose={() => setmenuOpen(false)}
        onOpen={() => setmenuOpen(true)}
      >
        <div className="burger-menu">
          <MdClose
            className="burger-close-btn"
            color="white"
            onClick={() => setmenuOpen(false)}
          />
          <div className="sidebar">
            <div className="profile-photo">
              <Image src={profileImage} />
              <Upload {...props} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              <div className="my-details">
                <div className="profile-details">
                  <h1>{personalDetails?.registerInfo?.name}</h1>
                  <p className="profile-id">
                    Profile ID : {personalDetails?.basicInfo?.profileId}
                  </p>
                  <p>
                    {moment().diff(personalDetails?.basicInfo?.dob, "years")}{" "}
                    Years,
                    {personalDetails?.basicInfo?.height},
                    {personalDetails?.basicInfo?.weight} kg
                  </p>
                  {personalDetails?.locationInfo?.district && (
                    <h5>
                      {personalDetails?.locationInfo?.district},{" "}
                      {personalDetails?.locationInfo?.state}
                    </h5>
                  )}
                  {personalDetails?.educationInfo?.highestEducation && (
                    <h5>
                      {personalDetails?.educationInfo?.highestEducation},{" "}
                      {personalDetails?.educationInfo?.occupation}
                    </h5>
                  )}
                  <h5>{personalDetails?.registerInfo?.phone}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Menu>
      <div className="menu-button" onClick={() => setmenuOpen(true)}>
        <MdOutlineMenu />
      </div>
      <div className="profile-photo">
        <Image src={profileImage} />
        <Upload {...props} beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <div className="my-details">
          <div className="profile-details">
            <h1>{personalDetails?.registerInfo?.name}</h1>
            <p className="profile-id">
              Profile ID : {personalDetails?.basicInfo?.profileId}
            </p>
            <p>
              {moment().diff(personalDetails?.basicInfo?.dob, "years")} Years,{" "}
              {personalDetails?.basicInfo?.height},{" "}
              {personalDetails?.basicInfo?.weight} kg
            </p>
            {personalDetails?.locationInfo?.district && (
              <h5>
                {personalDetails?.locationInfo?.district},{" "}
                {personalDetails?.locationInfo?.state}
              </h5>
            )}
            {personalDetails?.educationInfo?.highestEducation && (
              <h5>
                {personalDetails?.educationInfo?.highestEducation},{" "}
                {personalDetails?.educationInfo?.occupation}
              </h5>
            )}
            <h5>{personalDetails?.registerInfo?.phone}</h5>
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
