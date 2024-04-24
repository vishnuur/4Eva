import profileStore from "src/store/users/profile";
import noDataImage from "../../../../../assets/no-data.png";
import "../index.scss";
import SingleRow from "../singleRow";
import { useNavigate } from "react-router-dom";

export default function ContactInfoTab() {
  const { personalDetails } = profileStore((state) => state);
  const navigate = useNavigate();

  const showModal = () => {
    // setIsModalOpen(true);
    navigate("/profile/edit/contact-details");
  };

  return (
    <div className="profile-tabs">
      {!personalDetails?.locationInfo ? (
        <div className="no-data-container">
          <div className="header-wrap-no-data">
            <h2>Contact Info</h2>
          </div>
          <div className="no-data-wrap">
            <img src={noDataImage} />
            <span className="no-data-text">No details are added yet</span>
            <button className="add-details-btn" onClick={showModal}>
              Add Details
            </button>
          </div>
        </div>
      ) : (
        <div className="tab-content-wrap">
          {personalDetails?.locationInfo && (
            <div className="header-wrap">
              <h2>Contact Info</h2>
              <button className="add-details-btn" onClick={showModal}>
                Edit Details
              </button>
            </div>
          )}

          <div className="tab-content-cover">
            <div className="tab-content">
              <SingleRow
                keyName="Country"
                keyValue={personalDetails?.locationInfo?.country}
              />
              <SingleRow
                keyName="State"
                keyValue={personalDetails?.locationInfo?.state}
              />
              <SingleRow
                keyName="District"
                keyValue={personalDetails?.locationInfo?.district}
              />
              <SingleRow
                keyName="Citizenship"
                keyValue={personalDetails?.locationInfo?.citizenship}
              />
            </div>
            <div className="tab-content">
              <SingleRow
                keyName="Mobile No 1"
                keyValue={personalDetails?.contactInfo?.mobileNo1}
              />
              <SingleRow
                keyName="Mobile No 2"
                keyValue={personalDetails?.contactInfo?.mobileNo2}
              />
            </div>
          </div>
        </div>
      )}
      {/* {isModalOpen && (
        <ContactInfoModal
          modalVisible={isModalOpen}
          setModalVisible={setIsModalOpen}
        />
      )} */}
    </div>
  );
}
