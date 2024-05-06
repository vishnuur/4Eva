import CustomInput from "src/components/CustomInput";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginBg from "src/assets/admin-bg.jpeg";
import Logo from "src/assets/logo.jpeg";
import adminAuthStore from "src/store/admin/auth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginSuccess, onLogingIn, userToken } = adminAuthStore(
    (state) => state
  );
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const onSubmit = () => {
    onLogingIn(formData);
    navigate("/admin/dashboard");
  };

  useEffect(() => {
    if (loginSuccess) {
      navigate("/profile");
    }
  }, [loginSuccess]);

  useEffect(() => {
    if (userToken && userToken !== "") {
      navigate("/admin/dashboard");
    }
  }, [userToken]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="admin-login">
      <div className="login-wrap">
        <div className="login-form">
          <img className="bg-image" src={LoginBg} />
          <div className="login-fields">
            <img src={Logo} />
            <h3>Login</h3>
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
              value={formData.password}
              placeHolder="Password"
              type="password"
              style={{
                marginBottom: "24px",
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                borderColor: "#fff",
                color: "#fff",
              }}
              onChange={handleChange}
              name="password"
            />
            <button onClick={onSubmit} className="login-button">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
