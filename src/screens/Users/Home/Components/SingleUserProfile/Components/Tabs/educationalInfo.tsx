import profileStore from "src/store/users/profile";
import noDataImage from "../../../../../../../assets/no-data.png";
import "../index.scss";
import SingleRow from "../singleRow";
import { dataValidation } from "src/config/app.const";

export default function EducationalInfo() {
  const { usersDetails } = profileStore((state) => state);

  return (
    <div className="profile-tabs-user">
      {!usersDetails?.educationInfo ? (
        <div className="no-data-container">
          <div className="header-wrap-no-data">
            <h2>Education & Occupation Info</h2>
          </div>
          <div className="no-data-wrap">
            <img src={noDataImage} />
            <span className="no-data-text">No details are added yet</span>
          </div>
        </div>
      ) : (
        <div className="tab-content-wrap">
          {usersDetails?.educationInfo && (
            <div className="header-wrap">
              <h2>Education & Occupation Info</h2>
            </div>
          )}
          <div className="tab-content-cover">
            <div className="tab-content">
              <SingleRow
                keyName="Highest Education"
                keyValue={dataValidation(
                  usersDetails?.educationInfo?.highestEducation
                )}
              />
              <SingleRow
                keyName="College"
                keyValue={dataValidation(usersDetails?.educationInfo?.college)}
              />
              <SingleRow
                keyName="Education Details"
                keyValue={dataValidation(
                  usersDetails?.educationInfo?.educationDet
                )}
              />
            </div>
            <div className="tab-content">
              <SingleRow
                keyName="Employed In"
                keyValue={dataValidation(
                  usersDetails?.educationInfo?.employedIn
                )}
              />
              <SingleRow
                keyName="Occupation"
                keyValue={dataValidation(
                  usersDetails?.educationInfo?.occupation
                )}
              />
              <SingleRow
                keyName="Occupation Details"
                keyValue={dataValidation(
                  usersDetails?.educationInfo?.occupationDet
                )}
              />
              <SingleRow
                keyName="Annual Income"
                keyValue={dataValidation(
                  usersDetails?.educationInfo?.annualIncome
                )}
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
