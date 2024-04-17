import { useNavigate } from "react-router-dom";
import CustomInput from "src/components/CustomInput";
import "../Login/index.scss";
import CustomDropDown from "src/components/CustomDropDown";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    gender: "",
  });
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="login-wrap">
      <div className="login-form">
        <h3>Register</h3>
        <div>
          <CustomInput
            value={formData.name}
            placeHolder="Name"
            type="text"
            style={{ marginBottom: "24px", width: "100%" }}
            onChange={handleChange}
            name="name"
          />
          <CustomDropDown
            options={["Male", "Female", "Others"]}
            placeHolder="Gender"
            style={{ marginBottom: "24px", width: "100%" }}
            onChange={handleChange}
            name="gender"
          />
          <CustomInput
            value={formData.phone}
            placeHolder="Mobile No"
            type="text"
            style={{ marginBottom: "24px", width: "100%" }}
            onChange={handleChange}
            name="phone"
          />
          <CustomInput
            value={formData.password}
            placeHolder="Password"
            type="password"
            style={{ marginBottom: "24px", width: "100%" }}
            onChange={handleChange}
            name="password"
          />
          <CustomInput
            value=""
            placeHolder="Confirm Password"
            type="text"
            style={{ marginBottom: "24px", width: "100%" }}
          />
        </div>

        <button onClick={onSubmit} className="login-button">
          Sign Up
        </button>
      </div>
    </div>
  );
}
