import { useEffect } from "react";
import profileStore from "src/store/users/profile";
import noDataImage from "../../../../../../../assets/no-data.png";
import "../index.scss";
import SingleRow from "../singleRow";
import moment from "moment";
import { dataValidation } from "src/config/app.const";

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
                keyValue={dataValidation(usersDetails?.basicInfo?.name)}
              />
              <SingleRow
                keyName="Date Of Birth"
                keyValue={dataValidation(
                  moment(new Date(usersDetails?.basicInfo?.dob)).format(
                    "DD-MM-YYYY"
                  )
                )}
              />
              <SingleRow
                keyName="Height"
                keyValue={dataValidation(
                  usersDetails?.basicInfo?.height
                )}
              />
              <SingleRow
                keyName="Weight"
                keyValue={dataValidation(
                  usersDetails?.basicInfo?.weight + "kg"
                )}
              />
              <SingleRow
                keyName="Mother Tongue"
                keyValue={dataValidation(usersDetails?.basicInfo?.motherTounge)}
              />
            </div>
            <div className="tab-content">
              <SingleRow
                keyName="Religion"
                keyValue={dataValidation(
                  religions?.find(
                    (res: any) =>
                      res.religionId === usersDetails?.basicInfo?.religion
                  )?.religionName
                )}
              />
              <SingleRow
                keyName="Caste"
                keyValue={dataValidation(casteValue())}
              />

              <SingleRow
                keyName="Marital Status"
                keyValue={dataValidation(
                  usersDetails?.basicInfo?.maritalStatus
                )}
              />
              <SingleRow
                keyName="Physical Status"
                keyValue={dataValidation(
                  usersDetails?.basicInfo?.physicalStatus
                )}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
