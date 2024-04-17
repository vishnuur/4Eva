import { Tabs, TabsProps } from "antd";
import "./index.scss";
import PersonalDetails from "./Components/personalDetails";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Personal Details",
    children: <PersonalDetails />,
  },
  {
    key: "2",
    label: "Professional Details",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Address",
    children: "Content of Tab Pane 3",
  },
  {
    key: "4",
    label: "Education ",
    children: "Content of Tab Pane 3",
  },
];

export default function Profile() {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className="profile-wrap">
      <div className="profile-photo">
        <img src="https://xsgames.co/randomusers/avatar.php?g=male" />
      </div>
      <div className="my-details">
        <div className="profile-details">
          <h1>Vishnu UR</h1>
          <p>28 Years, 170cm</p>
          <h5>Trivandrum, Kerala</h5>
          <h5>B.Tech , Software Professional</h5>
          <h5>6282443764</h5>
        </div>
        <div style={{ paddingLeft: "8px", width: "100%" }}>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
