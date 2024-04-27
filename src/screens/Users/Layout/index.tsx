import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Layout, Menu, MenuProps } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./index.scss";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import authStore from "src/store/users/auth";
import profileStore from "src/store/users/profile";
import Logo from "src/assets/logo.jpeg";

const { Header, Content } = Layout;

const LayoutPage: React.FC = () => {
  // const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const { setLoginSuccess, setUserId } = authStore((state) => state);
  const { personalDetails } = profileStore((state) => state);
  const [currentPath, setcurrentPath] = useState("1");

  useEffect(() => {
    switch (pathname) {
      case "/home":
        setcurrentPath("1");
        break;
      case "/profile":
        setcurrentPath("2");
        break;

      default:
        break;
    }
  }, [pathname]);

  const onLogout = () => {
    localStorage.removeItem("userId");
    setLoginSuccess(false);
    navigate("/");
    setUserId("");
  };

  const dropDownItems: MenuProps["items"] = [
    {
      label: (
        <Link
          to={
            personalDetails?.basicInfo?.name
              ? "/profile"
              : "/profile/edit/basic-details"
          }
        >
          Profile
        </Link>
      ),
      key: "0",
    },
    {
      label: <Link to="/home">Home</Link>,
      key: "1",
    },
    {
      label: <a onClick={onLogout}>Logout</a>,
      key: "3",
    },
  ];

  const items = [
    {
      key: 1,
      label: (
        <Link className="header-text-color" to="/home">
          <HomeOutlined />
          <span>Home</span>
        </Link>
      ),
    },
    {
      key: 2,
      label: (
        <Link
          to={
            personalDetails?.basicInfo?.name
              ? "/profile"
              : "/profile/edit/basic-details"
          }
        >
          <UserOutlined />
          <span>Profile</span>
        </Link>
      ),
    },
  ];

  return (
    <Layout
      style={{ minHeight: "100vh", backgroundColor: "white" }}
      className="user-layout-container"
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
        className="header-color"
      >
        <div className="demo-logo" style={{ color: "white" }}>
          <img src={Logo} />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[currentPath]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          className="header-color"
          selectedKeys={[currentPath]}
          onClick={(e) => setcurrentPath(e.key)}
        />
        <Dropdown menu={{ items: dropDownItems }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Avatar
              style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
              size="large"
            >
              {personalDetails?.registerInfo?.name?.slice(0, 1)}
            </Avatar>
          </a>
        </Dropdown>
      </Header>
      <Content style={{ padding: "0 34px" }}>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>Layout</Breadcrumb.Item>
        </Breadcrumb> */}
        <div>
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
