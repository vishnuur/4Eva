import CustomInput from "src/components/CustomInput";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import authStore from "src/store/users/auth";
import { useEffect, useState } from "react";
import { customToast } from "src/components/Toast";
import { SUCCESS } from "src/config/app.const";

export default function Login() {
  const navigate = useNavigate();
  const { onLogingIn, loginSuccess, isProfileCreated } = authStore(
    (state) => state
  );
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
  });

  const onSubmit = () => {
    onLogingIn(formData);
  };

  useEffect(() => {
    if (loginSuccess) {
      customToast(SUCCESS, "Login Success");
      if (isProfileCreated) {
        navigate("/profile");
      } else {
        navigate("/profile/edit/basic-details");
      }
    }
  }, [loginSuccess]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="home-container">
      <img
        className="bg-login"
        src="https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <div className="login-wrap">
        <div className="login-form">
          <img
            className="bg-image"
            src="https://images.pexels.com/photos/916344/pexels-photo-916344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <div className="login-fields">
            <h3>Login Now</h3>
            <CustomInput
              value={formData.username}
              placeHolder="User name"
              type="text"
              style={{
                marginBottom: "42px",
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                borderColor: "#fff",
                color: "#fff",
              }}
              onChange={handleChange}
              name="username"
            />
            <CustomInput
              value={formData.phone}
              placeHolder="Phone"
              type="text"
              style={{
                marginBottom: "24px",
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                borderColor: "#fff",
                color: "#fff",
              }}
              onChange={handleChange}
              name="phone"
            />
            <p className="login-subhead">
              Don't have an account ? <Link to="/">Sign Up</Link>
            </p>
            <button onClick={onSubmit} className="login-button">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
