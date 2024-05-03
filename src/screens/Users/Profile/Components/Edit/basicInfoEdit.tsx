import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import CustomDropDown from "src/components/CustomDropDown";
import CustomInput from "src/components/CustomInput";
import profileStore from "src/store/users/profile";
import "../index.scss";
import authStore from "src/store/users/auth";
import dayjs from "dayjs";
import {
  saveBasicDetailsAPI,
  saveEmailInfoAPI,
} from "src/services/apis/users/profile";
import { useNavigate } from "react-router-dom";
import { customToast } from "src/components/Toast";
import { SUCCESS, convertToFeetAndInches } from "src/config/app.const";
import CustomButton from "src/components/CustomButton";
import moment from "moment";
import genericStore from "src/store/generic";

const formDataInitialState = {
  name: "",
  dob: new Date().toISOString(),
  maritalStatus: "",
  height: "",
  weight: "",
  physicalStatus: "",
  religion: "",
  caste: "",
  motherTounge: "",
  email: "",
};

export default function PersonalDetails() {
  const {
    religions,
    getCaste,
    caste,
    personalDetails,
    getProfileDetails,
    getReligion,
  } = profileStore((state) => state);
  const { userId } = authStore((state) => state);
  const { isLoading, isLoadingFn } = genericStore((state) => state);

  const navigate = useNavigate();
  const [formData, setFormData] = useState(formDataInitialState) as any;

  useEffect(() => {
    getProfileDetails({ registerId: userId });
    getReligion();
  }, [userId]);

  useEffect(() => {
    personalDetails?.basicInfo &&
      setFormData({
        ...personalDetails?.basicInfo,
        email: personalDetails?.emailInfo?.emailId,
        dob: moment(new Date(personalDetails?.basicInfo?.dob)).format(
          "YYYY-MM-DD"
        ),
      });
    return () => {
      setFormData(formDataInitialState);
    };
  }, [personalDetails]);

  const handleOk = async () => {
    // setModalVisible(false);
    isLoadingFn(true);
    const formDataCopy = { ...formData };
    delete formDataCopy.email;
    const result = await saveBasicDetailsAPI({
      registerId: userId,
      basicInfo: {
        ...formDataCopy,
        heightValue: formDataCopy.height, //height value
        height: convertToFeetAndInches(formDataCopy.height), //height text
      },
    });
    await saveEmailInfoAPI({
      registerId: userId,
      emailId: formData?.email,
    });
    isLoadingFn(false);
    if (result.status) {
      customToast(SUCCESS, "Basic Details Updated Successfully");
      navigate("/profile");
    }
    setFormData(formDataInitialState);
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
      dob: new Date(dateString).toISOString(),
    });
    console.log(date);
  };

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
    <div className="edit-page-container">
      <div className="edit-wrap">
        <div className="header-container">
          <h2>Basic Details</h2>
          <div className="edit-buttons">
            {personalDetails.basicInfo && (
              <CustomButton
                onClick={() => navigate(-1)}
                text="Cancel"
                style={{ marginRight: "12px" }}
                extraClassName="edit-page-btn"
              />
            )}
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
            <label>Name:</label>
            <CustomInput
              placeHolder="Name"
              onChange={handleChange}
              name="name"
              value={formData?.name}
              type="text"
              style={{ width: "100%" }}
            />
            <label>Email:</label>
            <CustomInput
              placeHolder="Email"
              onChange={handleChange}
              name="email"
              value={formData?.email}
              type="text"
              style={{ width: "100%" }}
            />
            <label>DOB:</label>
            <DatePicker
              onChange={onChangeDate}
              name="dob"
              value={dayjs(formData?.dob, "YYYY-MM-DD")}
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
              value={formData.maritalStatus}
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
              value={formData.physicalStatus}
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
              value={formData.height}
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

            <label>Religion:</label>
            <CustomDropDown
              options={religions?.map((res: any) => ({
                value: res?.religionId,
                label: res?.religionName,
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
          </div>
        </div>
      </div>
    </div>
  );
}
