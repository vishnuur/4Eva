import { Breadcrumb, DatePicker } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CustomButton from "src/components/CustomButton";
import CustomDropDown from "src/components/CustomDropDown";
import CustomInput from "src/components/CustomInput";
import "./index.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import profileStore from "src/store/users/profile";
import moment from "moment";
import AdminImageUpload from "./Component";

export default function UserExpanded() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    religions,
    getCaste,
    caste,
    personalDetails,
    getProfileDetails,
    getReligion,
  } = profileStore((state) => state);
  const [basicFormData, setbasicFormData] = useState() as any;
  const [educationFormData, seteducationFormData] = useState() as any;
  const [familyFormData, setfamilyFormData] = useState() as any;
  const [locationFormData, setlocationFormData] = useState() as any;

  const handleChange = (e: any) => {
    if (e.target.name === "religion") {
      getCaste({ religionId: e.target.value });
    }
    const { name, value } = e.target;
    setbasicFormData({
      ...basicFormData,
      [name]: value,
    });
  };

  console.log(caste, "castecaste");

  const handleOk = () => {
    console.log("value");
  };
  const onChangeDate = () => {
    console.log("first");
  };
  const handleChangeContactInfo = () => {
    console.log("handleChangeContactInfo");
  };

  useEffect(() => {
    if (userId && userId?.toLocaleLowerCase() !== "new") {
      getProfileDetails({ registerId: userId });
      getReligion();
    }
  }, [userId]);

  useEffect(() => {
    if (basicFormData?.religion) {
      getCaste({ religionId: basicFormData?.religion });
    }
  }, [basicFormData]);

  useEffect(() => {
    setbasicFormData({
      ...personalDetails?.basicInfo,
      email: personalDetails?.emailInfo?.emailId,
      dob: moment(new Date(personalDetails?.basicInfo?.dob)).format(
        "YYYY-MM-DD"
      ),
    });
    setfamilyFormData(personalDetails?.familyInfo);
    seteducationFormData(personalDetails?.educationInfo);
    setlocationFormData({
      ...personalDetails?.locationInfo,
      ...personalDetails?.contactInfo,
    });
  }, [personalDetails]);

  interface HeightOption {
    value: number;
    label: string;
  }

  const generateHeightOptions: () => HeightOption[] = () => {
    const options: HeightOption[] = [];
    for (let feet = 4; feet <= 7; feet++) {
      for (let inch = 1; inch <= 12; inch++) {
        if (feet === 7 && inch > 6) {
          break; // Exit loop when reaching 7ft 6inch
        }
        const value = feet + inch / 10; // Convert inch to decimal value
        const label = `${feet}ft ${inch}in`;
        options.push({ value, label });
      }
    }
    return options;
  };

  return (
    <div className="admin-user-creation-wrap">
      <span className="breadcrumb-wrap">
        <ArrowLeftOutlined onClick={() => navigate(-1)} />
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Users</Breadcrumb.Item>
        </Breadcrumb>
      </span>

      <div className="admin-user-header-wrap">
        <h1>
          {userId === "new"
            ? "Create New User"
            : personalDetails?.basicInfo?.name}
        </h1>
        {userId !== "new" && (
          <p>Profile ID : {personalDetails?.basicInfo?.profileId}</p>
        )}
      </div>
      <div className="admin-image-upload">
        <AdminImageUpload />
      </div>
      <div className="wrap">
        <div className="header-container">
          <h2>Basic Details</h2>
          {/* <div className="edit-buttons">
            <CustomButton
              onClick={handleOk}
              text="Save"
              primary
              extraClassName="edit-page-btn"
            />
          </div> */}
        </div>
        <div className="form-wrap">
          <div className="left">
            <label>Name:</label>
            <CustomInput
              placeHolder="Name"
              onChange={handleChange}
              name="name"
              value={basicFormData?.name}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Email:</label>
            <CustomInput
              placeHolder="Email"
              onChange={handleChange}
              name="email"
              value={basicFormData?.email}
              type="text"
              style={{ width: "100%" }}
            />
            <label>DOB:</label>
            <DatePicker
              onChange={onChangeDate}
              name="dob"
              value={dayjs(basicFormData?.dob, "YYYY-MM-DD")}
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              inputReadOnly
            />
            <label>Marital Status:</label>
            <CustomDropDown
              options={[
                { value: "Single", label: "Single" },
                { value: "Widowed", label: "Widowed" },
                { value: "Divorced", label: "Divorced" },
                { value: "Awaiting Divorced", label: "Awaiting Divorced" },
              ]}
              onChange={handleChange}
              placeHolder="Select Marital Status"
              name="maritalStatus"
              style={{ width: "100%" }}
              value={basicFormData?.maritalStatus}
            />
            <label>Physical Status:</label>
            <CustomDropDown
              options={[
                { value: "Normal", label: "Normal" },
                {
                  value: "Physically Challenged",
                  label: "Physically Challenged",
                },
              ]}
              onChange={handleChange}
              placeHolder="Select Physical Status"
              name="physicalStatus"
              style={{ width: "100%" }}
              value={basicFormData?.physicalStatus}
            />
          </div>
          <div className="right">
            <label>Height:</label>
            <CustomDropDown
              options={generateHeightOptions()}
              onChange={handleChange}
              placeHolder="Select Height"
              name="height"
              style={{ width: "100%" }}
              value={basicFormData.height}
            />
            <label>Weight:</label>
            <CustomInput
              placeHolder="Weight"
              onChange={handleChange}
              name="weight"
              value={basicFormData?.weight}
              type="text"
              style={{ width: "100%" }}
            />

            <label>Religion:</label>
            <CustomDropDown
              options={religions?.map((res: any) => ({
                value: res?.religionId,
                label: res?.religionName,
              }))}
              placeHolder="Religion"
              onChange={handleChange}
              name="religion"
              value={basicFormData?.religion}
              style={{ width: "100%" }}
            />
            <label>Caste:</label>
            <CustomDropDown
              options={caste?.map((res: any) => ({
                value: res?.casteid,
                label: res?.castename,
              }))}
              placeHolder="Caste"
              onChange={handleChange}
              name="caste"
              value={basicFormData?.caste}
              style={{ width: "100%" }}
            />
            <label>Mother tongue:</label>
            <CustomDropDown
              placeHolder="Mother Tongue"
              options={[
                { value: "Malayalam", label: "Malayalam" },
                { value: "English", label: "English" },
              ]}
              onChange={handleChange}
              name="motherTounge"
              value={basicFormData?.motherTounge}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="header-container">
          <h2>Family Details</h2>
          <div className="edit-buttons">
            {/* <CustomButton
              onClick={() => navigate(-1)}
              text="Cancel"
              style={{ marginRight: "12px" }}
              extraClassName="edit-page-btn"
            />
            <CustomButton
              onClick={handleOk}
              text="Save"
              primary
              loader={isLoading}
              disabled={isLoading}
              extraClassName="edit-page-btn"
            /> */}
          </div>
        </div>
        <div className="form-wrap">
          <div className="left">
            <label>Address:</label>
            <CustomInput
              placeHolder="Address"
              onChange={handleChange}
              name="Address"
              value={familyFormData?.Address}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Father's Name:</label>
            <CustomInput
              placeHolder="Father Name"
              onChange={handleChange}
              name="fatherName"
              value={familyFormData?.fatherName}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Father's Occupation:</label>
            <CustomInput
              placeHolder="Father's Occupation"
              onChange={handleChange}
              name="fatherOccupation"
              value={familyFormData?.fatherOccupation}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Mother's name:</label>
            <CustomInput
              placeHolder="Mother's name"
              onChange={handleChange}
              name="motherName"
              value={familyFormData?.motherName}
              type="text"
              style={{ width: "100%" }}
            />

            <label>Mother's Occupation:</label>
            <CustomInput
              placeHolder="Mother's Occupation"
              onChange={handleChange}
              name="motherOccupation"
              value={familyFormData?.motherOccupation}
              type="text"
              style={{ width: "100%" }}
            />
            <label>House Name:</label>
            <CustomInput
              placeHolder="House Name"
              onChange={handleChange}
              name="houseName "
              value={familyFormData?.houseName}
              type="text"
              style={{ width: "100%" }}
            />
          </div>
          <div className="right">
            <label>Family Value:</label>
            <CustomInput
              placeHolder="Family Value"
              onChange={handleChange}
              name="familyValue"
              value={familyFormData?.familyValue}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Family Type:</label>
            <CustomInput
              placeHolder="Family Type"
              onChange={handleChange}
              name="familyType"
              value={familyFormData?.familyType}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Family Status:</label>
            <CustomInput
              placeHolder="Family Status"
              onChange={handleChange}
              name="familyStaus"
              value={familyFormData?.familyStaus}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Number Of Brothers:</label>
            <CustomInput
              placeHolder="Number Of Brothers"
              onChange={handleChange}
              name="numOfBrothers"
              value={familyFormData?.numOfBrothers}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Number Of Sisters:</label>
            <CustomInput
              placeHolder="Number Of Sisters"
              onChange={handleChange}
              name="numOfSisters"
              value={familyFormData?.numOfSisters}
              type="text"
              style={{ width: "100%" }}
            />
            <label>About Family:</label>
            <CustomInput
              placeHolder="About Family"
              onChange={handleChange}
              name="aboutFamily"
              value={familyFormData?.aboutFamily}
              type="text"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="header-container">
          <h2>Education & Occupation Details</h2>
          <div className="edit-buttons">
            {/* <CustomButton
              onClick={() => navigate(-1)}
              text="Cancel"
              style={{ marginRight: "12px" }}
              extraClassName="edit-page-btn"
            />
            <CustomButton
              onClick={handleOk}
              text="Save"
              primary
              loader={isLoading}
              disabled={isLoading}
              extraClassName="edit-page-btn"
            /> */}
          </div>
        </div>
        <div className="form-wrap">
          <div className="left">
            <label>Highest Education:</label>
            <CustomInput
              placeHolder="Highest Education"
              onChange={handleChange}
              name="highestEducation"
              value={educationFormData?.highestEducation}
              type="text"
              style={{ width: "100%" }}
            />
            <label>College:</label>
            <CustomInput
              placeHolder="College"
              onChange={handleChange}
              name="college"
              value={educationFormData?.college}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Education Details:</label>
            <CustomInput
              placeHolder="Education Details"
              onChange={handleChange}
              name="educationDet"
              value={educationFormData?.educationDet}
              type="text"
              style={{ width: "100%" }}
            />
          </div>
          <div className="right">
            <label>Employed In:</label>
            <CustomInput
              placeHolder="Employed In"
              onChange={handleChange}
              name="employedIn"
              value={educationFormData?.employedIn}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Occupation:</label>
            <CustomInput
              placeHolder="Occupation"
              onChange={handleChange}
              name="occupation"
              value={educationFormData?.occupation}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Occupation Details:</label>
            <CustomInput
              placeHolder="Occupation Details"
              onChange={handleChange}
              name="occupationDet"
              value={educationFormData?.occupationDet}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Annual Income:</label>
            <CustomInput
              placeHolder="Annual Income"
              onChange={handleChange}
              name="annualIncome"
              value={educationFormData?.annualIncome}
              type="text"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="header-container">
          <h2>Contact Details</h2>
          <div className="edit-buttons">
            {/* <CustomButton
              onClick={() => navigate(-1)}
              text="Cancel"
              style={{ marginRight: "12px" }}
              extraClassName="edit-page-btn"
            />
            <CustomButton
              onClick={handleOk}
              text="Save"
              primary
              loader={isLoading}
              disabled={isLoading}
              extraClassName="edit-page-btn"
            /> */}
          </div>
        </div>
        <div className="form-wrap">
          <div className="left">
            <label>Country:</label>
            <CustomInput
              placeHolder="Country"
              onChange={handleChange}
              name="country"
              value={locationFormData?.country}
              type="text"
              style={{ width: "100%" }}
            />
            <label>State:</label>
            <CustomInput
              placeHolder="State"
              onChange={handleChange}
              name="state"
              value={locationFormData?.state}
              type="text"
              style={{ width: "100%" }}
            />
            <label>District:</label>
            <CustomInput
              placeHolder="District"
              onChange={handleChange}
              name="district"
              value={locationFormData?.district}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Citizenship:</label>
            <CustomInput
              placeHolder="Citizenship"
              onChange={handleChange}
              name="citizenship"
              value={locationFormData?.citizenship}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Mobile No1:</label>
            <CustomInput
              placeHolder="Mobile 1"
              onChange={handleChangeContactInfo}
              name="mobileNo1"
              value={locationFormData?.mobileNo1}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Mobile No2:</label>
            <CustomInput
              placeHolder="Mobile 2"
              onChange={handleChangeContactInfo}
              name="mobileNo2"
              value={locationFormData?.mobileNo2}
              type="text"
              style={{ width: "100%" }}
            />
          </div>
          <div className="right"></div>
        </div>
      </div>
    </div>
  );
}
