import CustomInput from "src/components/CustomInput";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import authStore from "src/store/users/auth";
import { useEffect, useState } from "react";
import LoginBg from "src/assets/admin-bg.jpeg";
import Logo from "src/assets/logo.jpeg";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginSuccess } = authStore((state) => state);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const onSubmit = () => {
    // onLogingIn(formData);
    navigate("/admin/dashboard");
  };

  useEffect(() => {
    if (loginSuccess) {
      navigate("/profile");
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
    <div className="admin-login">
      <div className="login-wrap">
        <div className="login-form">
          <img className="bg-image" src={LoginBg} />
          <div className="login-fields">
            <img src={Logo} />
            <h3>Login</h3>
            <CustomInput
              value={formData.name}
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
              name="name"
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
            <button onClick={onSubmit} className="login-button">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
