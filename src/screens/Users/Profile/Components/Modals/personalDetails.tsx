import { useEffect, useState } from "react";
import { DatePicker, Modal } from "antd";
import CustomDropDown from "src/components/CustomDropDown";
import CustomInput from "src/components/CustomInput";
import profileStore from "src/store/users/profile";
import "../index.scss";
import authStore from "src/store/users/auth";

export default function PersonalDetails() {
  const { postProfileDetails, religions, getCaste, caste, personalDetails } =
    profileStore((state) => state);
  const { userId } = authStore((state) => state);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: new Date(),
    maritalStatus: "",
    height: "",
    weight: "",
    physicalStatus: "",
    religion: "",
    caste: "",
    motherTounge: "",
    email: "",
  });

  useEffect(() => {
    personalDetails?.basicInfo &&
      setFormData({
        ...personalDetails?.basicInfo,
        email: personalDetails.emailInfo.emailId,
      });
  }, [personalDetails]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const payload = {
      registerId: userId,
      emailId: formData.email,
      contactInfo: {
        mobileNo1: "",
        mobileNo2: "",
        verifyStatusMob1: "",
        verifyStatusMob2: "",
      },
      familyInfo: {
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
        highestEducation: "",
        college: "",
        educationDet: "",
        employedIn: "",
        occupation: "",
        occupationDet: "",
        annualIncome: "",
      },
      locationInfo: {
        country: "",
        state: "",
        district: "",
        citizenship: "",
      },
      basicInfo: formData,
    };
    postProfileDetails(payload); //api to submit
    setFormData({
      name: "",
      dob: new Date(),
      maritalStatus: "",
      height: "",
      weight: "",
      physicalStatus: "",
      religion: "",
      caste: "",
      motherTounge: "",
      email: "",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: any) => {
    if (e.target.name === "religion") {
      getCaste({ religionId: e.target.value });
    }
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onChangeDate: any = (date: any, dateString: any) => {
    setFormData({
      ...formData,
      dob: new Date(dateString),
    });
    console.log(date);
  };

  return (
    <div className="profile-tabs">
      <button className="add-details-btn" onClick={showModal}>
        {formData?.name ? "Edit Details" : "Add Details"}
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
        title="Add basic info"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label>Name:</label>
        <CustomInput
          placeHolder="Name"
          onChange={handleChange}
          name="name"
          value={formData?.name}
          type="text"
          style={{ width: "100%" }}
        />
        <label>Name:</label>
        <CustomInput
          placeHolder="Email"
          onChange={handleChange}
          name="email"
          value={formData.email}
          type="text"
          style={{ width: "100%" }}
        />
        <label>DOB:</label>
        <DatePicker
          onChange={onChangeDate}
          name="dob"
          // value={dayjs(formData?.dob, "YYYY-MM-DD")}
          style={{ width: "100%" }}
          format="DD-MM-YYYY"
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
          value={formData.maritalStatus}
        />
        <label>Height:</label>
        <CustomInput
          placeHolder="Height"
          onChange={handleChange}
          name="height"
          value={formData.height}
          type="text"
          style={{ width: "100%" }}
        />
        <label>Weight:</label>
        <CustomInput
          placeHolder="Weight"
          onChange={handleChange}
          name="weight"
          value={formData.weight}
          type="text"
          style={{ width: "100%" }}
        />
        <label>Physical Status:</label>
        <CustomDropDown
          options={[
            { value: "Normal", label: "Normal" },
            { value: "Physically Challenged", label: "Physically Challenged" },
          ]}
          onChange={handleChange}
          placeHolder="Select Physical Status"
          name="physicalStatus"
          style={{ width: "100%" }}
          value={formData.physicalStatus}
        />
        <label>Religion:</label>
        <CustomDropDown
          options={religions?.map((res: any) => ({
            value: res.religionId,
            label: res.religionName,
          }))}
          placeHolder="Religion"
          onChange={handleChange}
          name="religion"
          value={formData.religion}
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
          value={formData.caste}
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
          value={formData.motherTounge}
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
}
