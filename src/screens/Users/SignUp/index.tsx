import { Link, useNavigate } from "react-router-dom";
import CustomInput from "src/components/CustomInput";
import "../Login/index.scss";
import CustomDropDown from "src/components/CustomDropDown";
import { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import authStore from "src/store/users/auth";
import { customToast } from "src/components/Toast";
import { SUCCESS } from "src/config/app.const";
import genericStore from "src/store/generic";
import CustomButton from "src/components/CustomButton";

const images = [
  {
    url: "https://images.pexels.com/photos/157757/wedding-dresses-fashion-character-bride-157757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    url: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    url: "https://images.pexels.com/photos/18382105/pexels-photo-18382105/free-photo-of-hindu-bride-and-groom-standing-outside-and-smiling.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    url: "https://images.pexels.com/photos/18332301/pexels-photo-18332301/free-photo-of-hindu-bride-and-groom-standing-in-front-of-a-temple.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function SignUp() {
  const { onSigningUp, signUpSuccess, loginSuccess } = authStore(
    (state) => state
  );
  const { isLoading } = genericStore((state) => state);

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    gender: "",
  });
  const navigate = useNavigate();
  const onSubmit = () => {
    onSigningUp(formData);
  };

  useEffect(() => {
    if (signUpSuccess && loginSuccess) {
      navigate("/profile/edit/basic-details");
      customToast(SUCCESS, "Login Success");
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
            <h3>Welcome to a Match made in heaven</h3>
            <p className="login-subhead">
              Already Signed up ? <Link to="/login">Login</Link>
            </p>
            <div>
              <CustomInput
                value={formData.username}
                placeHolder="Name"
                type="text"
                style={{
                  marginBottom: "24px",
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  borderColor: "#fff",
                  color: "#fff",
                }}
                onChange={handleChange}
                name="username"
              />
              <CustomDropDown
                options={[
                  { value: "M", label: "Male" },
                  { value: "F", label: "Female" },
                ]}
                placeHolder="Gender"
                style={{
                  marginBottom: "24px",
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  borderColor: "#fff",
                  color: "#fff",
                }}
                onChange={handleChange}
                name="gender"
              />
              <CustomInput
                value={formData.phone}
                placeHolder="Mobile No"
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
            </div>

            <CustomButton
              onClick={onSubmit}
              extraClassName={"login-button"}
              text="Sign Up"
              loader={isLoading}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
      <div className="home-part2">
        <div className="app-details">
          <div className="app-data">
            <h2>Discover everlasting love with 4Eva</h2>
            <p>
              At 4EvaMatrimony.com, we've been instrumental in uniting countless
              individuals with their ideal life partners and families. We firmly
              believe that marriage extends beyond the union of two individuals;
              it's the convergence of two families as well. At
              4EvaMatrimony.com, our mission is to facilitate your search for
              the perfect partner and family who resonate with your values,
              aspirations, and community. Our personalized search assistance
              ensures that you discover not only a life partner but also a
              harmonious family dynamic tailored to your preferences and
              interests. Join us on the journey to finding enduring love and
              building everlasting connections.
            </p>
            <h3>
              Discover your perfect match among the countless families united
              through 4Eva .
            </h3>
          </div>
          <div className="sample-image">
            <SimpleImageSlider
              width={380}
              height={504}
              images={images}
              showBullets={false}
              showNavs={false}
              autoPlay
            />
          </div>
        </div>
      </div>
    </div>
  );
}
