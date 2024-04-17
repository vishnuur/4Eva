import CustomInput from "src/components/CustomInput";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/home");
  };
  return (
    <div className="login-wrap">
      <div className="login-form">
        <h3>Login Now</h3>
        <CustomInput
          value=""
          placeHolder="User name"
          type="text"
          style={{ marginBottom: "42px", width: "100%" }}
        />
        <CustomInput
          value=""
          placeHolder="Password"
          type="password"
          style={{ marginBottom: "24px", width: "100%" }}
        />
        <span>
          <Link to="/sign-up">Don't have account ? Sign Up</Link>
        </span>
        <button onClick={onSubmit} className="login-button">
          Log In
        </button>
      </div>
    </div>
  );
}
