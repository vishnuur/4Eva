import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, theme } from "antd";
import Logo from "src/assets/logo.jpeg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./index.scss";
import adminAuthStore from "src/store/admin/auth";

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const { setUserToken, setLoginSuccess } = adminAuthStore((state) => state);

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken("");
    setLoginSuccess(false);
    navigate("/admin/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }} className="admin-layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          position: "fixed",
          width: "100%",
          zIndex: "100",
        }}
        className="header-color"
      >
        <div className="demo-logo" style={{ color: "white" }}>
          <img src={Logo} />
          <a onClick={() => logout()}>
            <Avatar
              style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
              size="large"
            >
              Logout
            </Avatar>
          </a>
        </div>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            marginTop: "60px",
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0, paddingTop: "24px" }}
            items={[
              {
                key: "1",
                icon: (
                  <Link to="/admin/dashboard">
                    <HomeOutlined />
                  </Link>
                ),
                label: "Dashboard",
              },
              // {
              //   key: "2",
              //   icon: <UserOutlined />,
              //   label: "Users",
              // },
            ]}
          />
        </Sider>

        <Layout style={{ marginLeft: 200, marginTop: 60 }}>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
