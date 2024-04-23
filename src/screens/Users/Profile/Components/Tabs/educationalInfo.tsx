import profileStore from "src/store/users/profile";
import noDataImage from "../../../../../assets/no-data.png";
import "../index.scss";
import EducationalInfoModal from "../Modals/educationalInfoModal";
import SingleRow from "../singleRow";
import { useState } from "react";

export default function EducationalInfo() {
  const { personalDetails } = profileStore((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="profile-tabs">
      {!personalDetails?.educationInfo ? (
        <div className="no-data-container">
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
          <div>
            {personalDetails?.educationInfo && (
              <button className="add-details-btn" onClick={showModal}>
                Edit Details
              </button>
            )}
          </div>

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
      <EducationalInfoModal
        modalVisible={isModalOpen}
        setModalVisible={setIsModalOpen}
      />
    </div>
  );
}
