import profileStore from "src/store/users/profile";
import noDataImage from "../../../../../../../assets/no-data.png";
import "../index.scss";
import SingleRow from "../singleRow";
import { dataValidation } from "src/config/app.const";

export default function ContactInfoTab() {
  const { usersDetails } = profileStore((state) => state);

  return (
    <div className="profile-tabs-user">
      {!usersDetails?.locationInfo ? (
        <div className="no-data-container">
          <div className="header-wrap-no-data">
            <h2>Contact Info</h2>
          </div>
          <div className="no-data-wrap">
            <img src={noDataImage} />
            <span className="no-data-text">No details are added yet</span>
          </div>
        </div>
      ) : (
        <div className="tab-content-wrap">
          {usersDetails?.locationInfo && (
            <div className="header-wrap">
              <h2>Contact Info</h2>
            </div>
          )}
          <div className="tab-content-cover">
            <div className="tab-content">
              <SingleRow
                keyName="Country"
                keyValue={dataValidation(usersDetails?.locationInfo?.country)}
              />
              <SingleRow
                keyName="State"
                keyValue={dataValidation(usersDetails?.locationInfo?.state)}
              />
              <SingleRow
                keyName="District"
                keyValue={dataValidation(usersDetails?.locationInfo?.district)}
              />
              <SingleRow
                keyName="Citizenship"
                keyValue={dataValidation(
                  usersDetails?.locationInfo?.citizenship
                )}
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
