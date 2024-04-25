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
  const navigate = useNavigate();
  const [formData, setFormData] = useState(formDataInitialState);

  useEffect(() => {
    getProfileDetails({ registerId: userId });
  }, [userId]);

  useEffect(() => {
    personalDetails?.familyInfo && setFormData(personalDetails?.familyInfo);
  }, [personalDetails?.familyInfo]);

  const handleOk = async () => {
    const result = await saveFamilyInfoAPI({
      registerId: userId,
      familyInfo: formData,
    });
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
  };

  return (
    <div>
      <div className="header-container">
        <h2>Family Details</h2>
        <div>
          <CustomButton
            onClick={() => navigate(-1)}
            text="Cancel"
            style={{ marginRight: "12px" }}
          />
          <CustomButton onClick={handleOk} text="Save" primary />
        </div>
      </div>
      <div className="form-wrap">
        <div className="left">
          <label>Address:</label>
          <CustomInput
            placeHolder="Address"
            onChange={handleChange}
            name="Address"
            value={formData.Address}
            type="text"
            style={{ width: "100%" }}
          />
          <label>Father's Name:</label>
          <CustomInput
            placeHolder="Father Name"
            onChange={handleChange}
            name="fatherName"
            value={formData.fatherName}
            type="text"
            style={{ width: "100%" }}
          />
          <label>Father's Occupation:</label>
          <CustomInput
            placeHolder="Father's Occupation"
            onChange={handleChange}
            name="fatherOccupation"
            value={formData.fatherOccupation}
            type="text"
            style={{ width: "100%" }}
          />
          <label>Mother's name:</label>
          <CustomInput
            placeHolder="Mother's name"
            onChange={handleChange}
            name="motherName"
            value={formData.motherName}
            type="text"
            style={{ width: "100%" }}
          />

          <label>Mother's Occupation:</label>
          <CustomInput
            placeHolder="Mother's Occupation"
            onChange={handleChange}
            name="motherOccupation"
            value={formData.motherOccupation}
            type="text"
            style={{ width: "100%" }}
          />
           <label>House Name:</label>
          <CustomInput
            placeHolder="House Name"
            onChange={handleChange}
            name="houseName "
            value={formData.houseName}
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
            value={formData.familyValue}
            type="text"
            style={{ width: "100%" }}
          />
          <label>Family Type:</label>
          <CustomInput
            placeHolder="Family Type"
            onChange={handleChange}
            name="familyType"
            value={formData.familyType}
            type="text"
            style={{ width: "100%" }}
          />
          <label>Family Status:</label>
          <CustomInput
            placeHolder="Family Status"
            onChange={handleChange}
            name="familyStaus"
            value={formData.familyStaus}
            type="text"
            style={{ width: "100%" }}
          />
          <label>Number Of Brothers:</label>
          <CustomInput
            placeHolder="Number Of Brothers"
            onChange={handleChange}
            name="numOfBrothers"
            value={formData.numOfBrothers}
            type="text"
            style={{ width: "100%" }}
          />
          <label>Number Of Sisters:</label>
          <CustomInput
            placeHolder="Number Of Sisters"
            onChange={handleChange}
            name="numOfSisters"
            value={formData.numOfSisters}
            type="text"
            style={{ width: "100%" }}
          />
          <label>About Family:</label>
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
  );
}
