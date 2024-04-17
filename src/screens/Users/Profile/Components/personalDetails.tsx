import { useState } from "react";
import "./index.scss";
import { Modal } from "antd";
import CustomDropDown from "src/components/CustomDropDown";
import CustomInput from "src/components/CustomInput";
import profileStore from "src/store/users/profile";
import { EditOutlined } from "@ant-design/icons";

export default function PersonalDetails() {
  const { savePersonalDetails, personalDetails } = profileStore(
    (state) => state
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    description: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    savePersonalDetails(formData);
    setFormData({
      name: "",
      relation: "",
      description: "",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onEditPress = (value: any) => {
    setIsModalOpen(true);
    setFormData({
      name: value.name,
      relation: value.relation,
      description: value.description,
    });
  };

  const handleChange = (e: any) => {
    console.log(e.target.value, "etargetrtt", e.target.name);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="profile-tabs">
      <button className="add-details-btn" onClick={showModal}>
        Add Details
      </button>
      <div className="details-listing">
        {personalDetails?.map((res: any) => (
          <div className="family-single-wrap">
            <span className="family-line">
              <p className="family-relation">{res.relation}</p>:
              <p className="family-name">{res.name}</p>
              <a onClick={() => onEditPress(res)}>
                <EditOutlined />
              </a>
            </span>
            <p className="family-desc">{res.description}</p>
          </div>
        ))}
      </div>
      <Modal
        title="Add details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label>Name:</label>
        <CustomInput
          placeHolder="Name"
          onChange={handleChange}
          name="name"
          value={formData.name}
          type="text"
          style={{ width: "100%" }}
        />
        <label>Relation:</label>
        <CustomDropDown
          options={["Mother", "Father", "Sibling"]}
          onChange={handleChange}
          placeHolder="Select relation"
          name="relation"
          style={{ width: "100%" }}
          value={formData.relation}
        />
        <label>Details:</label>
        <CustomInput
          placeHolder="Details"
          onChange={handleChange}
          name="description"
          value={formData.description}
          type="text"
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
}
