import profileStore from "src/store/users/profile";
import noDataImage from "../../../../../assets/no-data.png";
import "../index.scss";
import SingleRow from "../singleRow";
import ContactInfoModal from "../Modals/contactInfoModal";

export default function ContactInfoTab() {
  const { personalDetails } = profileStore((state) => state);
  return (
    <div className="profile-tabs">
      {!personalDetails?.locationInfo ? (
        <div className="no-data-container">
          <div className="no-data-wrap">
            <img src={noDataImage} />
            <span className="no-data-text">No details are added yet</span>
            <ContactInfoModal />
            {/* <button>Add details</button> */}
          </div>
        </div>
      ) : (
        <div className="tab-content-wrap">
          <div>{personalDetails?.locationInfo && <ContactInfoModal />}</div>

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
    </div>
  );
}
