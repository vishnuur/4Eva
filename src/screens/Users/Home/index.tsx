import React from "react";
import { Col, Row, theme } from "antd";
import UserCards from "./Components/userCards";
import "./index.scss";

const Home: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
          color: "black",
        }}
      >
        <div className="home-user-list">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className="gutter-row"
              span={4}
              style={{ marginBottom: "24px" }}
            >
              <UserCards
                image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                name="Aswathi"
                phone="12312312323423"
                address="Trivandrum"
              ></UserCards>
            </Col>
            <Col className="gutter-row" span={4}>
              <UserCards
                image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                name="Aswathi"
                phone="12312312323423"
                address="Trivandrum"
              ></UserCards>
            </Col>{" "}
            <Col className="gutter-row" span={4}>
              <UserCards
                image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                name="Aswathi"
                phone="12312312323423"
                address="Trivandrum"
              ></UserCards>
            </Col>{" "}
            <Col className="gutter-row" span={4}>
              <UserCards
                image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                name="Aswathi"
                phone="12312312323423"
                address="Trivandrum"
              ></UserCards>
            </Col>{" "}
            <Col className="gutter-row" span={4}>
              <UserCards
                image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                name="Aswathi"
                phone="12312312323423"
                address="Trivandrum"
              ></UserCards>
            </Col>{" "}
            <Col className="gutter-row" span={4}>
              <UserCards
                image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                name="Aswathi"
                phone="12312312323423"
                address="Trivandrum"
              ></UserCards>
            </Col>
            <Col className="gutter-row" span={4}>
              <UserCards
                image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                name="Aswathi"
                phone="12312312323423"
                address="Trivandrum"
              ></UserCards>
            </Col>{" "}
            <Col className="gutter-row" span={4}>
              <UserCards
                image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                name="Aswathi"
                phone="12312312323423"
                address="Trivandrum"
              ></UserCards>
            </Col> <Col className="gutter-row" span={4}>
              <UserCards
                image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                name="Aswathi"
                phone="12312312323423"
                address="Trivandrum"
              ></UserCards>
            </Col>{" "}
            <Col className="gutter-row" span={4}>
              <UserCards
                image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                name="Aswathi"
                phone="12312312323423"
                address="Trivandrum"
              ></UserCards>
            </Col>
          </Row>
        </div>
      </div>

      {/* // <Footer style={{ textAlign: "center" }}>Matrimonial website</Footer> */}
    </>
  );
};

export default Home;
