import { useEffect, useState } from "react";
import CustomInput from "src/components/CustomInput";
import profileStore from "src/store/users/profile";
import "../index.scss";
import authStore from "src/store/users/auth";
import {
  saveContactDetailsAPI,
  saveLocationInfoAPI,
} from "src/services/apis/users/profile";
import { useNavigate } from "react-router-dom";
import { customToast } from "src/components/Toast";
import { SUCCESS } from "src/config/app.const";
import CustomButton from "src/components/CustomButton";

const locationDataInitialState = {
  country: "",
  state: "",
  district: "",
  citizenship: "",
};

const contactDataInitialState = {
  mobileNo1: "",
  mobileNo2: "",
};

export default function ContactInfoModal() {
  const { getProfileDetails, personalDetails } = profileStore((state) => state);
  const navigate = useNavigate();
  const { userId } = authStore((state) => state);
  const [formDataLocation, setFormDataLocation] = useState(
    locationDataInitialState
  );
  const [formDataContact, setFormDataContact] = useState(
    contactDataInitialState
  );

  useEffect(() => {
    getProfileDetails({ registerId: userId });
  }, [userId]);

  useEffect(() => {
    personalDetails?.locationInfo &&
      setFormDataLocation(personalDetails?.locationInfo);
    personalDetails?.contactInfo &&
      setFormDataContact(personalDetails?.contactInfo);
    console.log("formmmm", personalDetails.contactInfo);
  }, [personalDetails]);
  const handleOk = async () => {
    const result = await saveLocationInfoAPI({
      registerId: userId,
      locationInfo: formDataLocation,
    });
    await saveContactDetailsAPI({
      registerId: userId,
      contactInfo: formDataContact,
    });
    if (result.status) {
      customToast(SUCCESS, "Contact Details Updated Successfully");
      navigate(-1);
    }
    // postProfileDetails(payload);
    setFormDataLocation(locationDataInitialState);
    setFormDataContact(contactDataInitialState);
  };

  // const handleCancel = () => {
  //   setModalVisible(false);
  // };

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
    <div>
      <div className="header-container">
        <h2>Contact Details</h2>
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
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
