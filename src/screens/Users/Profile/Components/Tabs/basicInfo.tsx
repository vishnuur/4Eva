import { useEffect } from "react";
import profileStore from "src/store/users/profile";
import noDataImage from "../../../../../assets/no-data.png";
import "../index.scss";
import SingleRow from "../singleRow";
import { useNavigate } from "react-router-dom";
import CustomButton from "src/components/CustomButton";
import moment from "moment";
import { convertToFeetAndInches } from "src/config/app.const";

export default function BasicInfo() {
  const { personalDetails, religions, caste, getCaste } = profileStore(
    (state) => state
  );
  const navigate = useNavigate();

  const showModal = () => {
    navigate("/profile/edit/basic-details");
  };

  useEffect(() => {
    personalDetails?.basicInfo?.religion &&
      getCaste({ religionId: personalDetails?.basicInfo?.religion });
  }, [personalDetails]);

  const casteValue = () => {
    return caste?.find(
      (res: any) => res.casteid === personalDetails?.basicInfo?.caste
    )?.castename;
  };

  return (
    <div className="profile-tabs">
      {!personalDetails?.basicInfo ? (
        <div className="no-data-container">
          <div className="header-wrap-no-data">
            <h2>Basic Info</h2>
          </div>
          <div className="no-data-wrap">
            <img src={noDataImage} />
            <span>No details are added yet</span>
          </div>
        </div>
      ) : (
        <div className="tab-content-wrap">
          {personalDetails?.basicInfo && (
            <div className="header-wrap">
              <h2>Basic Info</h2>
              <CustomButton onClick={showModal} text="Edit Details" primary />
            </div>
          )}

          <div className="tab-content-cover">
            <div className="tab-content">
              <SingleRow
                keyName="Name"
                keyValue={personalDetails?.basicInfo?.name}
              />
              <SingleRow
                keyName="Date Of Birth"
                keyValue={moment(
                  new Date(personalDetails?.basicInfo?.dob)
                ).format("DD-MM-YYYY")}
              />
              <SingleRow
                keyName="Height"
                keyValue={convertToFeetAndInches(
                  personalDetails?.basicInfo?.height
                )}
              />
              <SingleRow
                keyName="Weight"
                keyValue={personalDetails?.basicInfo?.weight + "kg"}
              />
              <SingleRow
                keyName="Mother Tongue"
                keyValue={personalDetails?.basicInfo?.motherTounge}
              />
            </div>
            <div className="tab-content">
              <SingleRow
                keyName="Religion"
                keyValue={
                  religions?.find(
                    (res: any) =>
                      res.religionId === personalDetails?.basicInfo?.religion
                  )?.religionName
                }
              />
              <SingleRow keyName="Caste" keyValue={casteValue()} />

              <SingleRow
                keyName="Marital Status"
                keyValue={personalDetails?.basicInfo?.maritalStatus}
              />
              <SingleRow
                keyName="Physical Status"
                keyValue={personalDetails?.basicInfo?.physicalStatus}
              />
              <SingleRow
                keyName="Email"
                keyValue={personalDetails?.emailInfo?.emailId}
              />
            </div>
          </div>
        </div>
      )}
      {/* {isModalOpen&& <PersonalDetails
          modalVisible={isModalOpen}
          setModalVisible={setIsModalOpen}
        />} */}
    </div>
  );
}
