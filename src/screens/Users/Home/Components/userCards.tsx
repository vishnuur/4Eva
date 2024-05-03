import CustomButton from "src/components/CustomButton";
import "./index.scss";
import DefaultProfile from "../../../../assets/default-user.jpeg";

import { MdLocationOn } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import { MdWork } from "react-icons/md";
import { IMG_BASE_URL, convertToFeetAndInches } from "src/config/app.const";
import { useNavigate } from "react-router-dom";

interface cardProps {
  name: string;
  phone: string;
  address: string;
  image: string;
  height: string;
  weight: string;
  age: any;
  cast: string;
  occupation: string;
  education: string;
  userId: number;
  profileId: number;
}
export default function UserCards({
  name,
  address,
  image,
  height,
  weight,
  age,
  cast,
  occupation,
  education,
  userId,
  profileId,
}: cardProps) {
  const navigate = useNavigate();
  const profileImage = image ? `${IMG_BASE_URL}${image}` : DefaultProfile;
  return (
    <div className="card-wrap">
      <img src={profileImage}></img>
      <div className="details-wrap">
        <div className="card-details">
          <div className="initial-det">
            <p className="card-address" style={{ color: "#ffc107" }}>
              {age} Years
            </p>
            <p className="card-address" style={{ color: "#ffc107" }}>
              {convertToFeetAndInches(height)}, {weight} kg
            </p>
          </div>
          <span className="title-wrap">
            <p className="card-title">{name}</p>
            <p className="card-profileId">Profile ID: {profileId}</p>
          </span>
          <span className="card-content-wrap">
            <div className="wrapper">
              <span style={{ width: "22px" }}></span>
              <span className="card-address">{cast ?? "Not available"}</span>
            </div>
            <div className="wrapper">
              <MdLocationOn color="gray" />
              <p className="card-address" title={address}>
                {!address || address === ""
                  ? "Not available"
                  : address.slice(0, 30) + (address?.length > 30 ? "...." : "")}
              </p>
            </div>
            <div className="wrapper">
              <MdWork color="gray" />
              <p className="card-phone">
                {!occupation || occupation === ""
                  ? "Not available"
                  : occupation}
              </p>
            </div>
            <div className="wrapper">
              <RiGraduationCapFill color="gray" />
              <p className="card-phone">
                {!education || education === "" ? "Not available" : education}
              </p>
            </div>
          </span>
        </div>
        <CustomButton
          text="View Profile"
          onClick={() => {
            navigate(`/home/user-details/${userId}`);
            // console.log("first");
          }}
          primary
          extraClassName="card-button"
        />
      </div>
    </div>
  );
}
