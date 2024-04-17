import React from "react";
import { Avatar, Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const items = [
  {
    key: 1,
    label: <Link to="/home">Home</Link>,
  },
  {
    key: 2,
    label: <Link to="/profile">Profile</Link>,
  },
];

const dropDownItems: MenuProps["items"] = [
  {
    label: <Link to="/profile">Profile</Link>,
    key: "0",
  },
  {
    label: <Link to="/home">Home</Link>,
    key: "1",
  },
  {
    label: <Link to="/">Logout</Link>,
    key: "3",
  },
];

const LayoutPage: React.FC = (props: any) => {
  console.log(props.children, "childrennnn");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" style={{ color: "white" }}>
          Logo
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Dropdown menu={{ items: dropDownItems }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Avatar
              style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
              size="large"
            >
              Vishnu
            </Avatar>
          </a>
        </Dropdown>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>Layout</Breadcrumb.Item>
        </Breadcrumb> */}
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      {/* <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer> */}
    </Layout>
  );
};

export default LayoutPage;
