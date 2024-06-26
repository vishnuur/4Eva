import { useEffect, useState } from "react";
import CustomInput from "src/components/CustomInput";
import profileStore from "src/store/users/profile";
import "../index.scss";
import authStore from "src/store/users/auth";
import { saveFamilyInfoAPI } from "src/services/apis/users/profile";
import { useNavigate } from "react-router-dom";
import { customToast } from "src/components/Toast";
import { SUCCESS } from "src/config/app.const";
import CustomButton from "src/components/CustomButton";
import genericStore from "src/store/generic";
import { Radio } from "antd";

const formDataInitialState = {
  Address: "",
  fatherName: "",
  motherName: "",
  fatherOccupation: "",
  motherOccupation: "",
  familyValue: "",
  familyType: "",
  familyStaus: "",
  numOfBrothers: "",
  numOfSisters: "",
  aboutFamily: "",
  houseName: "",
};

export default function FamilyModal() {
  const { getProfileDetails, personalDetails } = profileStore((state) => state);
  const { userId } = authStore((state) => state);
  const { isLoading, isLoadingFn } = genericStore((state) => state);

  const navigate = useNavigate();
  const [formData, setFormData] = useState(formDataInitialState);

  useEffect(() => {
    getProfileDetails({ registerId: userId });
  }, [userId]);

  useEffect(() => {
    personalDetails?.familyInfo && checkIfValid();
  }, [personalDetails?.familyInfo]);

  const handleOk = async () => {
    isLoadingFn(true);
    const result = await saveFamilyInfoAPI({
      registerId: userId,
      familyInfo: formData,
    });
    isLoadingFn(false);
    if (result.status) {
      customToast(SUCCESS, "Family Details Updated Successfully");
      navigate(-1);
    }
    // postProfileDetails(payload);
    setFormData(formDataInitialState);
  };

  // const handleCancel = () => {};

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(name, "NAMEVALUE", value);
  };

  const checkIfValid = () => {
    console.log("callled");
    const familyValueToCheck = [
      "Liberal",
      "Moderate",
      "Traditional",
      "Orthodox",
    ];
    const familyTypeToCheck = ["Others", "Nuclear Family", "Joint Family"];
    const familyStatusToCheck = [
      "Rich/Affluent",
      "High Class",
      "Upper Middle Class",
      "Middle Class",
    ];
    let valueChanges = {};
    if (
      !familyValueToCheck?.includes(personalDetails?.familyInfo?.familyValue)
    ) {
      console.log("got in");
      valueChanges = { familyValue: "Orthodox" };
    }
    if (!familyTypeToCheck?.includes(personalDetails?.familyInfo?.familyType)) {
      valueChanges = { ...valueChanges, familyType: "Joint Family" };
    }
    if (
      !familyStatusToCheck?.includes(personalDetails?.familyInfo?.familyStaus)
    ) {
      valueChanges = { ...valueChanges, familyStaus: "Middle Class" };
    }
    setFormData({
      ...personalDetails?.familyInfo,
      ...valueChanges,
    });
  };

  return (
    <div className="edit-page-container">
      <div className="edit-wrap">
        <div className="header-container">
          <h2>Family Details</h2>
          <div className="edit-buttons">
            <CustomButton
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
            />
          </div>
        </div>
        <div className="form-wrap">
          <div className="left">
            <label className="profile-edit-label">Address:</label>
            <CustomInput
              placeHolder="Address"
              onChange={handleChange}
              name="Address"
              value={formData.Address}
              type="text"
              style={{ width: "100%" }}
            />
            <label className="profile-edit-label">Father's Name:</label>
            <CustomInput
              placeHolder="Father Name"
              onChange={handleChange}
              name="fatherName"
              value={formData.fatherName}
              type="text"
              style={{ width: "100%" }}
            />
            <label className="profile-edit-label">Father's Occupation:</label>
            <CustomInput
              placeHolder="Father's Occupation"
              onChange={handleChange}
              name="fatherOccupation"
              value={formData.fatherOccupation}
              type="text"
              style={{ width: "100%" }}
            />
            <label className="profile-edit-label">Mother's name:</label>
            <CustomInput
              placeHolder="Mother's name"
              onChange={handleChange}
              name="motherName"
              value={formData.motherName}
              type="text"
              style={{ width: "100%" }}
            />

            <label className="profile-edit-label">Mother's Occupation:</label>
            <CustomInput
              placeHolder="Mother's Occupation"
              onChange={handleChange}
              name="motherOccupation"
              value={formData.motherOccupation}
              type="text"
              style={{ width: "100%" }}
            />
            <label className="profile-edit-label">House Name:</label>
            <CustomInput
              placeHolder="House Name"
              onChange={handleChange}
              name="houseName"
              value={formData.houseName}
              type="text"
              style={{ width: "100%" }}
            />
          </div>
          <div className="right">
            <span className="radio-container">
              <label className="profile-edit-label">Family Value:</label>
              <Radio.Group
                onChange={handleChange}
                value={formData.familyValue}
                name="familyValue"
              >
                <Radio value={"Orthodox"}>Orthodox</Radio>
                <Radio value={"Traditional"}>Traditional</Radio>
                <Radio value={"Moderate"}>Moderate</Radio>
                <Radio value={"Liberal"}>Liberal</Radio>
              </Radio.Group>
            </span>

            <span className="radio-container">
              <label className="profile-edit-label">Family Type:</label>
              <Radio.Group
                onChange={handleChange}
                value={formData.familyType}
                name="familyType"
              >
                <Radio value={"Joint Family"}>Joint Family</Radio>
                <Radio value={"Nuclear Family"}>Nuclear Family</Radio>
                <Radio value={"Others"}>Others</Radio>
              </Radio.Group>
            </span>

            <span className="radio-container">
              <label className="profile-edit-label">Family Status:</label>
              <Radio.Group
                onChange={handleChange}
                value={formData.familyStaus}
                name="familyStaus"
              >
                <Radio value={"Middle Class"}>Middle Class</Radio>
                <Radio value={"Upper Middle Class"}>Upper Middle Class</Radio>
                <Radio value={"High Class"}>High Class</Radio>
                <Radio value={"Liberal"}>Rich/Affluent</Radio>
              </Radio.Group>
            </span>

            <label className="profile-edit-label">Number Of Brothers:</label>
            <CustomInput
              placeHolder="Number Of Brothers"
              onChange={handleChange}
              name="numOfBrothers"
              value={formData.numOfBrothers}
              type="text"
              style={{ width: "100%" }}
            />
            <label className="profile-edit-label">Number Of Sisters:</label>
            <CustomInput
              placeHolder="Number Of Sisters"
              onChange={handleChange}
              name="numOfSisters"
              value={formData.numOfSisters}
              type="text"
              style={{ width: "100%" }}
            />
            <label className="profile-edit-label">About Family:</label>
            <CustomInput
              placeHolder="About Family"
              onChange={handleChange}
              name="aboutFamily"
              value={formData.aboutFamily}
              type="text"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
