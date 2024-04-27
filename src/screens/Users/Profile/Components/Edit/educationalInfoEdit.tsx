import { useEffect, useState } from "react";
import CustomInput from "src/components/CustomInput";
import profileStore from "src/store/users/profile";
import "../index.scss";
import authStore from "src/store/users/auth";
import { saveEducationDetailAPI } from "src/services/apis/users/profile";
import { useNavigate } from "react-router-dom";
import { customToast } from "src/components/Toast";
import { SUCCESS } from "src/config/app.const";
import CustomButton from "src/components/CustomButton";
import genericStore from "src/store/generic";

const formDataInitialState = {
  highestEducation: "",
  college: "",
  educationDet: "",
  employedIn: "",
  occupation: "",
  occupationDet: "",
  annualIncome: "",
};

export default function EducationalInfoModal() {
  const { personalDetails, getProfileDetails } = profileStore((state) => state);
  const { userId } = authStore((state) => state);
  const { isLoading, isLoadingFn } = genericStore((state) => state);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(formDataInitialState);

  useEffect(() => {
    getProfileDetails({ registerId: userId });
  }, [userId]);

  useEffect(() => {
    personalDetails?.educationInfo &&
      setFormData(personalDetails?.educationInfo);
  }, [personalDetails]);

  const handleOk = async () => {
    isLoadingFn(true);
    const result = await saveEducationDetailAPI({
      registerId: userId,
      educationInfo: {
        ...formData,
        annualIncome: parseInt(formData.annualIncome),
      },
    });
    isLoadingFn(false);
    if (result.status) {
      customToast(SUCCESS, "Education Details Updated Successfully");
      navigate(-1);
    }
    setFormData(formDataInitialState);
  };

  // const handleCancel = () => {
  //   setModalVisible(false);
  // };

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
        <h2>Education & Occupation Details</h2>
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
          <label>Highest Education:</label>
          <CustomInput
            placeHolder="Highest Education"
            onChange={handleChange}
            name="highestEducation"
            value={formData.highestEducation}
            type="text"
            style={{ width: "100%" }}
          />
          <label>College:</label>
          <CustomInput
            placeHolder="College"
            onChange={handleChange}
            name="college"
            value={formData.college}
            type="text"
            style={{ width: "100%" }}
          />
          <label>Education Details:</label>
          <CustomInput
            placeHolder="Education Details"
            onChange={handleChange}
            name="educationDet"
            value={formData.educationDet}
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
            value={formData.employedIn}
            type="text"
            style={{ width: "100%" }}
          />
          <label>Occupation:</label>
          <CustomInput
            placeHolder="Occupation"
            onChange={handleChange}
            name="occupation"
            value={formData.occupation}
            type="text"
            style={{ width: "100%" }}
          />
          <label>Occupation Details:</label>
          <CustomInput
            placeHolder="Occupation Details"
            onChange={handleChange}
            name="occupationDet"
            value={formData.occupationDet}
            type="text"
            style={{ width: "100%" }}
          />
          <label>Annual Income:</label>
          <CustomInput
            placeHolder="Annual Income"
            onChange={handleChange}
            name="annualIncome"
            value={formData?.annualIncome}
            type="text"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
