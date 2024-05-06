import CustomTable from "src/components/Table";
import "./index.scss";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { DataSourceItemType } from "antd/es/auto-complete";
import { Space } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomButton from "src/components/CustomButton";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import adminUsersStore from "src/store/admin/users";

export default function AdminDashboard() {
  const { usersList, getUserList, totalCount } = adminUsersStore(
    (state) => state
  );
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [gender, setGender] = useState("") as any;
  const [religion, setreligion] = useState("") as any;
  const [maritalStatus, setmaritalStatus] = useState("") as any;
  const [ageRange, setageRange] = useState("1to100") as any;

  const showModal = () => {
    navigate("/admin/users/new");
  };

  useEffect(() => {
    const payload = {
      gender: gender,
      searchtype: "P",
      limitBy: 15,
      page: 1,
      maritalStatus: maritalStatus,
      heightFrom: "",
      heightTo: "",
      weight: "",
      agefrom: ageRange.split("to")[0],
      ageto: ageRange.split("to")[1],
      religion: religion,
      caste: "",
      anualIncome: 0,
    };
    getUserList(payload);
  }, [currentPage, gender, religion, maritalStatus, ageRange]);

  const onPaginationChange = (value: number) => {
    setCurrentPage(value);
  };

  const columns: ColumnsType<DataSourceItemType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Profile ID",
      dataIndex: "profileId",
      key: "profileId",
      // defaultSortOrder: "descend",
      // sorter: (a: any, b: any) => a.profileId - b.profileId,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (value) => (
        <p>{value?.toLowerCase() === "m" ? "Male" : "Female"}</p>
      ),
      filters: [
        {
          text: "Male",
          value: "M",
        },
        {
          text: "Female",
          value: "F",
        },
      ],
      filterMultiple: false,
      onFilter: (value, _) => {
        setGender(value);
        return true;
      },
    },
    {
      title: "Age",
      dataIndex: "dob",
      key: "dob",
      render: (value) => <p>{moment().diff(value, "years")} years</p>,
      filters: [
        {
          text: "18 to 30",
          value: "18to30",
        },
        {
          text: "30 to 40",
          value: "30to40",
        },
        {
          text: "40 to 50",
          value: "40to50",
        },
        {
          text: "50 above",
          value: "50to100",
        },
      ],
      filterMultiple: false,
      onFilter: (value, _) => {
        setageRange(value);
        return true;
      },
    },
    {
      title: "Maritial Status",
      dataIndex: "maritalStatus",
      key: "maritalStatus",
      render: (value) => <p>{value}</p>,
      filters: [
        {
          text: "Single",
          value: "Single",
        },
        {
          text: "Widowed",
          value: "Widowed",
        },
        {
          text: "Divorced",
          value: "Divorced",
        },
        {
          text: "Awaiting Divorced",
          value: "Awaiting Divorced",
        },
      ],
      filterMultiple: false,
      onFilter: (value, _) => {
        setmaritalStatus(value);
        return true;
      },
      filterResetToDefaultFilteredValue: true,
    },
    {
      title: "Religion",
      dataIndex: "religionname",
      key: "religionname",
      filters: [
        {
          text: "Hindu",
          value: "hindu",
        },
        {
          text: "Islam",
          value: "islam",
        },
        {
          text: "Christian",
          value: "christian",
        },
      ],
      filterMultiple: false,
      onFilter: (value, _) => {
        setreligion(value);
        return true;
      },
      // defaultFilteredValue: ["hindu"],
    },
    {
      title: "Caste",
      dataIndex: "castename",
      key: "castename",
    },

    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a
            className="table-btn edit"
            // onClick={() => navigate(`/admin/users/${value?.registerId}`)}
            title="Edit"
          >
            <EditOutlined />
          </a>
          <a className="table-btn delete" title="Delete">
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="header">
        <h2>Users</h2>
        <CustomButton text="Add User" onClick={showModal} primary />
      </div>
      <CustomTable
        data={usersList}
        columns={columns}
        totalCount={totalCount}
        onPaginationChange={onPaginationChange}
      />
    </div>
  );
}
