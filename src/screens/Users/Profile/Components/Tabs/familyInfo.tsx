import profileStore from "src/store/users/profile";
import noDataImage from "../../../../../assets/no-data.png";
import "../index.scss";
import SingleRow from "../singleRow";
import { useNavigate } from "react-router-dom";
import CustomButton from "src/components/CustomButton";

export default function FamilyInfoTab() {
  const { personalDetails } = profileStore((state) => state);
  const navigate = useNavigate();

  const showModal = () => {
    // setIsModalOpen(true);
    navigate("/profile/edit/family-details");
  };

  return (
    <div className="profile-tabs">
      {!personalDetails?.familyInfo ? (
        <div className="no-data-container">
          <div className="header-wrap-no-data">
            <h2>Family Info</h2>
          </div>
          <div className="no-data-wrap">
            <img src={noDataImage} />
            <span className="no-data-text">No details are added yet</span>
            <CustomButton onClick={showModal} text="Add Details" primary />
          </div>
        </div>
      ) : (
        <div className="tab-content-wrap">
          {personalDetails?.educationInfo && (
            <div className="header-wrap">
              <h2>Family Info</h2>
              <CustomButton onClick={showModal} text="Edit Details" primary />
            </div>
          )}
          <div className="tab-content-cover">
            <div className="tab-content">
              <SingleRow
                keyName="Address"
                keyValue={personalDetails?.familyInfo?.Address}
              />
              <SingleRow
                keyName="Father's Name"
                keyValue={personalDetails?.familyInfo?.fatherName}
              />
              <SingleRow
                keyName="Father's Occupation"
                keyValue={personalDetails?.familyInfo?.fatherOccupation}
              />
              <SingleRow
                keyName="Mother's Name"
                keyValue={personalDetails?.familyInfo?.motherName}
              />
              <SingleRow
                keyName="Mother's Occupation"
                keyValue={personalDetails?.familyInfo?.motherOccupation}
              />
              <SingleRow
                keyName="House Name"
                keyValue={personalDetails?.familyInfo?.houseName}
              />
            </div>
            <div className="tab-content">
              <SingleRow
                keyName="Family Value"
                keyValue={personalDetails?.familyInfo?.familyValue}
              />
              <SingleRow
                keyName="Family Type"
                keyValue={personalDetails?.familyInfo?.familyType}
              />
              <SingleRow
                keyName="Family Status"
                keyValue={personalDetails?.familyInfo?.familyStaus}
              />
              <SingleRow
                keyName="Number Of Brothers"
                keyValue={personalDetails?.familyInfo?.numOfBrothers}
              />
              <SingleRow
                keyName="Number Of Sisters"
                keyValue={personalDetails?.familyInfo?.numOfSisters}
              />{" "}
              <SingleRow
                keyName="About Family"
                keyValue={personalDetails?.familyInfo?.aboutFamily}
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
