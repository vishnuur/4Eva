import React from "react";
import { Space, Table } from "antd";

const { Column } = Table;

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
  dob: string;
}

const data: DataType[] = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
    dob: "27/10/1998",
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
    dob: "27/10/1998",
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
    dob: "27/10/1998",
  },
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
    dob: "27/10/1998",
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
    dob: "27/10/1998",
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
    dob: "27/10/1998",
  },
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
    dob: "27/10/1998",
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
    dob: "27/10/1998",
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
    dob: "27/10/1998",
  },
];

const CustomTable: React.FC = () => (
  <Table dataSource={data}>
    {/* <ColumnGroup title="Name"> */}
    <Column title="Name" dataIndex="firstName" key="firstName" />
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="DOB" dataIndex="dob" key="dob" />

    {/* <Column title="Last Name" dataIndex="lastName" key="lastName" /> */}
    {/* </ColumnGroup> */}
    <Column title="Address" dataIndex="address" key="address" />
    {/* <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags: string[]) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )}
    /> */}
    <Column
      title="Action"
      key="action"
      render={(_: any) => (
        <Space size="middle">
          {/* <a>Invite {record.lastName}</a> */}
          <a>Delete</a>
        </Space>
      )}
    />
  </Table>
);

export default CustomTable;
