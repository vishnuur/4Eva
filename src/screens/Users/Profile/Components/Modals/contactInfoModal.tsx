import { useEffect, useState } from "react";
import { Modal } from "antd";
import CustomInput from "src/components/CustomInput";
import profileStore from "src/store/users/profile";
import "../index.scss";
import authStore from "src/store/users/auth";

export default function ContactInfoModal() {
  const { postProfileDetails, personalDetails } = profileStore(
    (state) => state
  );
  const { userId } = authStore((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataLocation, setFormDataLocation] = useState({
    country: "",
    state: "",
    district: "",
    citizenship: "",
  });
  const [formDataContact, setFormDataContact] = useState({
    mobileNo1: "",
    mobileNo2: "",
  });

  useEffect(() => {
    personalDetails?.locationInfo &&
      setFormDataLocation(personalDetails?.locationInfo);
    personalDetails?.contactInfo &&
      setFormDataContact(personalDetails?.contactInfo);
    personalDetails?.registerInfo &&
      setFormDataContact({
        ...formDataContact,
        mobileNo1: personalDetails?.registerInfo?.phone,
      });
  }, [personalDetails]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const payload = {
      registerId: userId,
      emailId: personalDetails?.emailInfo.emailId ?? "",
      educationInfo: personalDetails?.educationInfo ?? {
        highestEducation: "",
        college: "",
        educationDet: "",
        employedIn: "",
        occupation: "",
        occupationDet: "",
        annualIncome: "",
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
      basicInfo: personalDetails?.basicInfo,
      locationInfo: formDataLocation,
      contactInfo: formDataContact,
    };
    postProfileDetails(payload);
    // setFormData({
    // Address: "",
    // fatherName: "",
    // motherName: "",
    // fatherOccupation: "",
    // motherOccupation: "",
    // familyValue: "",
    // familyType: "",
    // familyStaus: "",
    // numOfBrothers: 1,
    // numOfSisters: 1,
    // aboutFamily: "",
    // });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormDataLocation({
      ...formDataLocation,
      [name]: value,
    });
  };

  const handleChangeContactInfo = (e: any) => {
    const { name, value } = e.target;
    setFormDataContact({
      ...formDataContact,
      [name]: value,
    });
  };
  return (
    <div className="profile-tabs">
      <button className="add-details-btn" onClick={showModal}>
        {formDataLocation?.country ? "Edit Details" : "Add Details"}
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
        title="Add Contact info"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label>Country:</label>
        <CustomInput
          placeHolder="Country"
          onChange={handleChange}
          name="country"
          value={formDataLocation.country}
          type="text"
          style={{ width: "100%" }}
        />
        <label>State:</label>
        <CustomInput
          placeHolder="State"
          onChange={handleChange}
          name="state"
          value={formDataLocation.state}
          type="text"
          style={{ width: "100%" }}
        />
        <label>District:</label>
        <CustomInput
          placeHolder="District"
          onChange={handleChange}
          name="district"
          value={formDataLocation.district}
          type="text"
          style={{ width: "100%" }}
        />
        <label>Citizenship:</label>
        <CustomInput
          placeHolder="Citizenship"
          onChange={handleChange}
          name="citizenship"
          value={formDataLocation.citizenship}
          type="text"
          style={{ width: "100%" }}
        />
        <label>Mobile No1:</label>
        <CustomInput
          placeHolder="Mobile 1"
          onChange={handleChangeContactInfo}
          name="mobileNo1"
          value={formDataContact.mobileNo1}
          type="text"
          style={{ width: "100%" }}
        />
        <label>Mobile No2:</label>
        <CustomInput
          placeHolder="Mobile 2"
          onChange={handleChangeContactInfo}
          name="mobileNo2"
          value={formDataContact.mobileNo2}
          type="text"
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
}
