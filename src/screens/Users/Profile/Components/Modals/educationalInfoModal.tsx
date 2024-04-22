import { useEffect, useState } from "react";
import { Modal } from "antd";
import CustomInput from "src/components/CustomInput";
import profileStore from "src/store/users/profile";
import "../index.scss";
import authStore from "src/store/users/auth";

export default function EducationalInfoModal() {
  const { postProfileDetails, personalDetails } = profileStore(
    (state) => state
  );
  const { userId } = authStore((state) => state);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    highestEducation: "",
    college: "",
    educationDet: "",
    employedIn: "",
    occupation: "",
    occupationDet: "",
    annualIncome: "",
  });

  useEffect(() => {
    personalDetails?.educationInfo &&
      setFormData(personalDetails?.educationInfo);
  }, [personalDetails]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const payload = {
      registerId: userId,
      emailId: personalDetails?.emailInfo.emailId ?? "",
      contactInfo: personalDetails?.contactInfo ?? {
        mobileNo1: "",
        mobileNo2: "",
        verifyStatusMob1: "",
        verifyStatusMob2: "",
      },
      familyInfo: personalDetails?.familyInfo ?? {
        Address: "",
        fatherName: "",
        motherName: "",
        fatherOccupation: "",
        motherOccupation: "",
        familyValue: "",
        familyType: "",
        familyStaus: "",
        numOfBrothers: 1,
        numOfSisters: 1,
        aboutFamily: "",
      },
      educationInfo: {
        ...formData,
        annualIncome: parseInt(formData.annualIncome),
      },
      basicInfo: personalDetails?.basicInfo,
    };
    postProfileDetails(payload);
    // setFormData({
    //   highestEducation: "",
    //   college: "",
    //   educationDet: "",
    //   employedIn: "",
    //   occupation: "",
    //   occupationDet: "",
    //   annualIncome: "",
    // });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="profile-tabs">
      <button className="add-details-btn" onClick={showModal}>
        Add Details
      </button>
      {/* <div className="details-listing">
        {personalDetails?.map((res: any) => (
          <div className="family-single-wrap">
            <span className="family-line">
              <p className="family-relation">{res.relation}</p>:
              <p className="family-name">{res.name}</p>
              <a onClick={() => onEditPress(res)}>
                <EditOutlined />
              </a>
            </span>
            <p className="family-desc">{res.description}</p>
          </div>
        ))}
      </div> */}
      <Modal
        title="Add Education info"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
          value={formData.annualIncome}
          type="text"
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
}
