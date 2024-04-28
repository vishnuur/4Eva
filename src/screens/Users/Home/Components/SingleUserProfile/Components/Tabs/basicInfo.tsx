import { useEffect } from "react";
import profileStore from "src/store/users/profile";
import noDataImage from "../../../../../../../assets/no-data.png";
import "../index.scss";
import SingleRow from "../singleRow";
import moment from "moment";

export default function BasicInfo() {
  const { usersDetails, religions, caste, getCaste } = profileStore(
    (state) => state
  );

  useEffect(() => {
    usersDetails?.basicInfo?.religion &&
      getCaste({ religionId: usersDetails?.basicInfo?.religion });
  }, [usersDetails]);

  const casteValue = () => {
    return caste?.find(
      (res: any) => res.casteid === usersDetails?.basicInfo?.caste
    )?.castename;
  };

  return (
    <div className="profile-tabs-user">
      {!usersDetails?.basicInfo ? (
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
          {usersDetails?.basicInfo && (
            <div className="header-wrap">
              <h2>Basic Info</h2>
            </div>
          )}
          <div className="tab-content-cover">
            <div className="tab-content">
              <SingleRow
                keyName="Name"
                keyValue={usersDetails?.basicInfo?.name}
              />
              <SingleRow
                keyName="Date Of Birth"
                keyValue={moment(new Date(usersDetails?.basicInfo?.dob)).format(
                  "DD-MM-YYYY"
                )}
              />
              <SingleRow
                keyName="Height"
                keyValue={usersDetails?.basicInfo?.height + "cm"}
              />
              <SingleRow
                keyName="Weight"
                keyValue={usersDetails?.basicInfo?.weight + "kg"}
              />
              <SingleRow
                keyName="Mother Tongue"
                keyValue={usersDetails?.basicInfo?.motherTounge}
              />
            </div>
            <div className="tab-content">
              <SingleRow
                keyName="Religion"
                keyValue={
                  religions?.find(
                    (res: any) =>
                      res.religionId === usersDetails?.basicInfo?.religion
                  )?.religionName
                }
              />
              <SingleRow keyName="Caste" keyValue={casteValue()} />

              <SingleRow
                keyName="Marital Status"
                keyValue={usersDetails?.basicInfo?.maritalStatus}
              />
              <SingleRow
                keyName="Physical Status"
                keyValue={usersDetails?.basicInfo?.physicalStatus}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
