import profileStore from "src/store/users/profile";
import noDataImage from "../../../../../assets/no-data.png";
import "../index.scss";
import SingleRow from "../singleRow";
import { useNavigate } from "react-router-dom";

export default function EducationalInfo() {
  const { personalDetails } = profileStore((state) => state);
  const navigate = useNavigate();

  const showModal = () => {
    // setIsModalOpen(true);
    navigate("/profile/edit/education-details");
  };
  return (
    <div className="profile-tabs">
      {!personalDetails?.educationInfo ? (
        <div className="no-data-container">
          <div className="header-wrap-no-data">
            <h2>Educational Info</h2>
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
          {personalDetails?.educationInfo && (
            <div className="header-wrap">
              <h2>Educational Info</h2>
              <button className="add-details-btn" onClick={showModal}>
                Edit Details
              </button>
            </div>
          )}

          <div className="tab-content-cover">
            <div className="tab-content">
              <SingleRow
                keyName="Highest Education"
                keyValue={personalDetails?.educationInfo?.highestEducation}
              />
              <SingleRow
                keyName="College"
                keyValue={personalDetails?.educationInfo?.college_Institute}
              />
              <SingleRow
                keyName="Education Details"
                keyValue={personalDetails?.educationInfo?.educationDetail}
              />
            </div>
            <div className="tab-content">
              <SingleRow
                keyName="Employed In"
                keyValue={personalDetails?.educationInfo?.employedIn}
              />
              <SingleRow
                keyName="Occupation"
                keyValue={personalDetails?.educationInfo?.occupation}
              />
              <SingleRow
                keyName="Occupation Details"
                keyValue={personalDetails?.educationInfo?.occupationDetail}
              />
              <SingleRow
                keyName="Annual Income"
                keyValue={personalDetails?.educationInfo?.anualIncome}
              />
            </div>
          </div>
        </div>
      )}
      {/* {isModalOpen&&
      <EducationalInfoModal
        modalVisible={isModalOpen}
        setModalVisible={setIsModalOpen}
      />
       } */}
    </div>
  );
}
