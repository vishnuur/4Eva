import CustomTable from "src/components/Table";
import "./index.scss";
import Modal from "antd/es/modal/Modal";
import CustomDropDown from "src/components/CustomDropDown";
import CustomInput from "src/components/CustomInput";
import { useState } from "react";

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    description: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
    <div>
      <div className="header">
        <h2>Users</h2>
        <button className="primary-btn" onClick={showModal}>
          Add Users
        </button>
      </div>
      <Modal
        title="Add details"
        open={isModalOpen}
        // onOk={handleOk}
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
      <CustomTable />
    </div>
  );
}
