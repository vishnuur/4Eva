import profileStore from "src/store/users/profile";
import noDataImage from "../../../../../assets/no-data.png";
import "../index.scss";
import SingleRow from "../singleRow";
import ContactInfoModal from "../Modals/contactInfoModal";
import { useState } from "react";

export default function ContactInfoTab() {
  const { personalDetails } = profileStore((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="profile-tabs">
      {!personalDetails?.locationInfo ? (
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
            {personalDetails?.locationInfo && (
              <button className="add-details-btn" onClick={showModal}>
                Edit Details
              </button>
            )}
          </div>

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
            <div className="tab-content"></div>
          </div>
        </div>
      )}
      <ContactInfoModal
        modalVisible={isModalOpen}
        setModalVisible={setIsModalOpen}
      />
    </div>
  );
}
