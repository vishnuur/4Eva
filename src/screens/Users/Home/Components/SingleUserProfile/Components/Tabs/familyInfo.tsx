import profileStore from "src/store/users/profile";
import noDataImage from "../../../../../../../assets/no-data.png";
import "../index.scss";
import SingleRow from "../singleRow";
import { dataValidation } from "src/config/app.const";

export default function FamilyInfoTab() {
  const { usersDetails } = profileStore((state) => state);

  return (
    <div className="profile-tabs-user">
      {!usersDetails?.familyInfo ? (
        <div className="no-data-container">
          <div className="header-wrap-no-data">
            <h2>Family Info</h2>
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
              <h2>Family Info</h2>
            </div>
          )}
          <div className="tab-content-cover">
            <div className="tab-content">
              <SingleRow
                keyName="Address"
                keyValue={dataValidation(usersDetails?.familyInfo?.Address)}
              />
              <SingleRow
                keyName="Father's Name"
                keyValue={dataValidation(usersDetails?.familyInfo?.fatherName)}
              />
              <SingleRow
                keyName="Father's Occupation"
                keyValue={dataValidation(
                  usersDetails?.familyInfo?.fatherOccupation
                )}
              />
              <SingleRow
                keyName="Mother's Name"
                keyValue={dataValidation(usersDetails?.familyInfo?.motherName)}
              />
              <SingleRow
                keyName="Mother's Occupation"
                keyValue={dataValidation(
                  usersDetails?.familyInfo?.motherOccupation
                )}
              />
              <SingleRow
                keyName="House Name"
                keyValue={dataValidation(usersDetails?.familyInfo?.houseName)}
              />
            </div>
            <div className="tab-content">
              <SingleRow
                keyName="Family Value"
                keyValue={dataValidation(usersDetails?.familyInfo?.familyValue)}
              />
              <SingleRow
                keyName="Family Type"
                keyValue={dataValidation(usersDetails?.familyInfo?.familyType)}
              />
              <SingleRow
                keyName="Family Status"
                keyValue={dataValidation(usersDetails?.familyInfo?.familyStaus)}
              />
              <SingleRow
                keyName="Number Of Brothers"
                keyValue={dataValidation(
                  usersDetails?.familyInfo?.numOfBrothers
                )}
              />
              <SingleRow
                keyName="Number Of Sisters"
                keyValue={dataValidation(
                  usersDetails?.familyInfo?.numOfSisters
                )}
              />{" "}
              <SingleRow
                keyName="About Family"
                keyValue={dataValidation(usersDetails?.familyInfo?.aboutFamily)}
              />
            </div>
          </div>
        </div>
      )}
      {/* {isModalOpen&&
      <FamilyModal
        modalVisible={isModalOpen}
        setModalVisible={setIsModalOpen}
      />
       } */}
    </div>
  );
}
