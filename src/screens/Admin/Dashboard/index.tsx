import CustomTable from "src/components/Table";
import "./index.scss";
import { useEffect, useState } from "react";
import homeStore from "src/store/users/home";
import authStore from "src/store/users/auth";
import { ColumnsType } from "antd/es/table";
import { DataSourceItemType } from "antd/es/auto-complete";
import { Space } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomButton from "src/components/CustomButton";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function AdminDashboard() {
  const { getUserList, userList, listLoading, totalCount } = homeStore(
    (state) => state
  );
  const navigate = useNavigate();
  const { userId } = authStore((state) => state);
  const [currentPage, setCurrentPage] = useState(1);

  const showModal = () => {
    navigate("/admin/users/new");
  };

  useEffect(() => {
    const payload = {
      registerId: userId,
      searchtype: "P",
      limitBy: 10,
      page: currentPage,
      maritalStatus: "",
      height: "",
      weight: "",
      agefrom: "",
      ageTo: "",
      religion: "",
      caste: "",
      anualIncome: 0,
    };
    if (userId) {
      getUserList(payload);
    }
  }, [userId, currentPage]);

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
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.profileId - b.profileId,
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
      onFilter: (value, _) => {
        console.log(value, "value and record");
        return false;
      },
      // onFilter: (value, record) =>
      //   record.address.indexOf(value as string) === 0,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (value) => <p>{moment(value).format("DD-MM-YYYY")}</p>,
    },
    {
      title: "Age",
      dataIndex: "dob",
      key: "dob",
      render: (value) => <p>{moment().diff(value, "years")} years</p>,
    },
    {
      title: "Religion",
      dataIndex: "religionname",
      key: "religionname",
    },
    {
      title: "Caste",
      dataIndex: "castename",
      key: "castename",
    },

    {
      title: "Action",
      key: "action",
      render: (value) => (
        <Space size="middle">
          <a
            className="table-btn edit"
            onClick={() => navigate(`/admin/users/${value?.registerId}`)}
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
        data={userList}
        columns={columns}
        totalCount={totalCount}
        onPaginationChange={onPaginationChange}
      />
    </div>
  );
}
