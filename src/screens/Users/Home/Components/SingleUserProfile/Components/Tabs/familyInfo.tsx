import profileStore from "src/store/users/profile";
import noDataImage from "../../../../../../../assets/no-data.png";
import "../index.scss";
import SingleRow from "../singleRow";

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
                keyValue={usersDetails?.familyInfo?.Address}
              />
              <SingleRow
                keyName="Father's Name"
                keyValue={usersDetails?.familyInfo?.fatherName}
              />
              <SingleRow
                keyName="Father's Occupation"
                keyValue={usersDetails?.familyInfo?.fatherOccupation}
              />
              <SingleRow
                keyName="Mother's Name"
                keyValue={usersDetails?.familyInfo?.motherName}
              />
              <SingleRow
                keyName="Mother's Occupation"
                keyValue={usersDetails?.familyInfo?.motherOccupation}
              />
              <SingleRow
                keyName="House Name"
                keyValue={usersDetails?.familyInfo?.houseName}
              />
            </div>
            <div className="tab-content">
              <SingleRow
                keyName="Family Value"
                keyValue={usersDetails?.familyInfo?.familyValue}
              />
              <SingleRow
                keyName="Family Type"
                keyValue={usersDetails?.familyInfo?.familyType}
              />
              <SingleRow
                keyName="Family Status"
                keyValue={usersDetails?.familyInfo?.familyStaus}
              />
              <SingleRow
                keyName="Number Of Brothers"
                keyValue={usersDetails?.familyInfo?.numOfBrothers}
              />
              <SingleRow
                keyName="Number Of Sisters"
                keyValue={usersDetails?.familyInfo?.numOfSisters}
              />{" "}
              <SingleRow
                keyName="About Family"
                keyValue={usersDetails?.familyInfo?.aboutFamily}
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
