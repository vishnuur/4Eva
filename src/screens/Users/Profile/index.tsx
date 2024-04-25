import { Button, Image, Upload, UploadProps } from "antd";
import "./index.scss";
import profileStore from "src/store/users/profile";
import DefaultProfile from "../../../assets/profile.jpg";

import { useEffect } from "react";
import EducationalInfo from "./Components/Tabs/educationalInfo";
import BasicInfo from "./Components/Tabs/basicInfo";
import FamilyInfoTab from "./Components/Tabs/familyInfo";
import ContactInfoTab from "./Components/Tabs/contactInfo";
import { UploadOutlined } from "@ant-design/icons";
import { customToast } from "src/components/Toast";
import { ERROR, SUCCESS } from "src/config/app.const";
import authStore from "src/store/users/auth";
import { saveProfileImage } from "src/services/apis/users/profile";
import LoaderComponent from "src/components/LoaderComponent";

export default function Profile() {
  const { getProfileDetails, personalDetails, getReligion, isLoading } =
    profileStore((state) => state);
  const { userId } = authStore((state) => state);
  // const onChange = (key: string) => {
  //   console.log(key);
  // };
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
    ? `${import.meta.env.VITE_IMAGE_URL}forEva/${
        personalDetails?.imageInfo?.image
      }`
    : DefaultProfile;

  return isLoading ? (
    <LoaderComponent />
  ) : (
    <div className="profile-wrap">
      <div className="profile-photo">
        <Image src={profileImage} />
        <Upload {...props} beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <div className="my-details">
          <div className="profile-details">
            <h1>{personalDetails?.registerInfo?.name}</h1>
            <p>
              24 Years, {personalDetails?.basicInfo?.height} cm,
              {personalDetails?.basicInfo?.weight} kg
            </p>
            <h5>Trivandrum, Kerala</h5>
            <h5>B.Tech , Software Professional</h5>
            <h5>{personalDetails?.registerInfo?.phone}</h5>
          </div>
        </div>
      </div>
      <div className="my-details">
        {/* <div className="profile-details">
          <h1>{personalDetails?.registerInfo?.name}</h1>
          <p>
            24 Years, {personalDetails?.basicInfo?.height} cm,
            {personalDetails?.basicInfo?.weight} kg
          </p>
          <h5>Trivandrum, Kerala</h5>
          <h5>B.Tech , Software Professional</h5>
          <h5>{personalDetails?.registerInfo?.phone}</h5>
        </div> */}
        <div className="my-details-content">
          <BasicInfo />
          <EducationalInfo />
          <FamilyInfoTab />
          <ContactInfoTab />
          {/* <Tabs defaultActiveKey="1" items={items} onChange={onChange} /> */}
        </div>
      </div>
    </div>
  );
}
