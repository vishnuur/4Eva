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
import { saveBasicDetailsAPI } from "src/services/apis/users/profile";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "src/components/LoaderComponent";

export default function Profile() {
  const {
    getProfileDetails,
    postProfileDetails,
    personalDetails,
    getReligion,
    isLoading,
  } = profileStore((state) => state);
  const { userId } = authStore((state) => state);
  const navigate = useNavigate();
  // const onChange = (key: string) => {
  //   console.log(key);
  // };
  useEffect(() => {
    getProfileDetails({ registerId: userId });
    getReligion();
  }, [userId]);

  const props: UploadProps = {
    async onChange(info) {
      const payload = {
        registerId: userId,
        basicInfo: personalDetails?.basicInfo,
        image: info.file,
      };
      const result = await saveBasicDetailsAPI(payload);
      if (result.status) {
        customToast(SUCCESS, "Basic Details Updated Successfully");
        // if(personalDetails.basicInfo)
        navigate("/profile");
      }
      postProfileDetails(payload);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        customToast(SUCCESS, "File uploaded successfully");
      } else if (info.file.status === "error") {
        customToast(ERROR, "File upload failed");
      }
    },
  };

  return isLoading ? (
    <LoaderComponent />
  ) : (
    <div className="profile-wrap">
      <div className="profile-photo">
        <Image src={DefaultProfile} />
        <Upload {...props}>
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
        <div style={{ paddingLeft: "8px", width: "100%" }}>
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
