import React, { useEffect, useState } from "react";
import { Drawer, Slider, SliderSingleProps } from "antd";
import "./index.scss";
import CustomButton from "src/components/CustomButton";
import CustomDropDown from "src/components/CustomDropDown";
import profileStore from "src/store/users/profile";

interface filterDrwaer {
  visible: boolean;
  visibleFn: any;
  setfilters: any;
  appliedFilters: any;
}
const FilterDrawer: React.FC<filterDrwaer> = ({
  visible,
  visibleFn,
  setfilters,
  appliedFilters,
}) => {
  const { religions, getCaste, caste, getReligion } = profileStore(
    (state) => state
  );

  const [formData, setFormData] = useState({ ...appliedFilters });

  const onClose = () => {
    setFormData(appliedFilters);
    visibleFn(false);
  };

  const marks: SliderSingleProps["marks"] = {
    18: "18",
    30: "30",
    40: "40",
    50: "50",
    60: "60",
  };

  useEffect(() => {
    setFormData({ ...appliedFilters });
  }, [appliedFilters]);

  useEffect(() => {
    getReligion();
  }, []);

  const ageFilter = (value: any) => {
    setFormData({ ...formData, ageTo: value[1], agefrom: value[0] });
  };

  const handleChange = (e: any) => {
    if (e.target.name === "religion") {
      const religionNameValue = religions.filter(
        (x: any) =>
          x.religionName?.toLowerCase() === e.target.value.toLowerCase()
      );
      getCaste({ religionId: religionNameValue[0]?.religionId });
    }
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  interface HeightOption {
    value: number | string;
    label: string;
  }

  const generateHeightOptions: () => HeightOption[] = () => {
    const options: HeightOption[] = [];
    for (let feet = 4; feet <= 7; feet++) {
      for (let inch = 1; inch <= 12; inch++) {
        if (feet === 7 && inch > 6) {
          break; // Exit loop when reaching 7ft 6inch
        }

        const value = feet.toString() + "." + inch.toString(); // Convert inch to decimal value
        const label = `${feet}ft ${inch}in`;
        options.push({ value, label });
      }
    }
    return options;
  };

  function convertToFeetAndInches(heightStr: string) {
    try {
      const [feet, inches] = heightStr.split(".").map(parseFloat);
      return `${feet}ft ${inches}in`;
    } catch (error) {
      // If no decimal point, assume it's just feet
      const feet = parseFloat(heightStr);
      return `${feet}ft 0in`;
    }
  }

  const onSubmit = () => {
    setfilters({
      ...formData,
      heightValue: formData.heightValue && formData.heightValue,
      height:
        formData.heightValue && convertToFeetAndInches(formData.heightValue),
      agefrom: formData?.agefrom.toString(),
      ageTo: formData?.ageTo.toString(),
    });
    onClose();
  };

  return (
    <>
      <Drawer
        title="Filter"
        placement={"right"}
        closable={true}
        onClose={onClose}
        open={visible}
        key={"right"}
        width={"540"}
      >
        <div className="drawer-wrap">
          <div className="filters-list">
            <div className="single-filter">
              <label>Age</label>
              <Slider
                range={{ draggableTrack: true }}
                defaultValue={[0, 0]}
                value={[parseInt(formData?.agefrom), parseInt(formData.ageTo)]}
                marks={marks}
                min={18}
                max={60}
                onChange={(value: any) => ageFilter(value)}
              />
            </div>
            <div className="single-filter">
              <label>Height:</label>
              <CustomDropDown
                options={generateHeightOptions()}
                onChange={handleChange}
                placeHolder="Select Height"
                name="heightValue"
                style={{ width: "100%" }}
                value={formData.heightValue}
              />
            </div>
            <div className="single-filter">
              <label>Marital Status:</label>
              <CustomDropDown
                options={[
                  { value: "Single", label: "Single" },
                  { value: "Widowed", label: "Widowed" },
                  { value: "Divorced", label: "Divorced" },
                  { value: "Awaiting Divorced", label: "Awaiting Divorced" },
                ]}
                onChange={handleChange}
                placeHolder="Select Marital Status"
                name="maritalStatus"
                style={{ width: "100%" }}
                value={formData.maritalStatus}
              />
            </div>
            <div className="single-filter">
              <label>Religion:</label>
              <CustomDropDown
                options={religions?.map((res: any) => ({
                  value: res?.religionName.toLocaleLowerCase(),
                  label: res?.religionName,
                }))}
                placeHolder="Religion"
                onChange={handleChange}
                name="religion"
                value={formData.religion}
                style={{ width: "100%" }}
              />
            </div>
            <div className="single-filter">
              <label>Caste:</label>
              <CustomDropDown
                options={caste?.map((res: any) => ({
                  value: res?.casteid,
                  label: res?.castename,
                }))}
                placeHolder="Caste"
                onChange={handleChange}
                name="caste"
                value={formData.caste}
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <CustomButton
            text="Submit"
            onClick={() => onSubmit()}
            extraClassName={"drawer-submit"}
            primary
          />
        </div>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
