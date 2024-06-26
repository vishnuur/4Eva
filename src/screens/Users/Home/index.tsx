import React, { useEffect, useRef, useState } from "react";
import { Badge, Col, Image, Row, Skeleton, theme } from "antd";
import UserCards from "./Components/userCards";
import "./index.scss";
import homeStore from "src/store/users/home";
import authStore from "src/store/users/auth";
import moment from "moment";
import profileStore from "src/store/users/profile";
import DefaultProfile from "../../../assets/profile.jpg";
import { FaCopy, FaRegEdit } from "react-icons/fa";
import { TbUserEdit } from "react-icons/tb";
// import { IoMdPlanet } from "react-icons/io";
import { MdDoneAll, MdOutlineSettings } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import genericStore from "src/store/generic";
import Loader from "react-js-loader";
import { IMG_BASE_URL, SUCCESS } from "src/config/app.const";
import CustomButton from "src/components/CustomButton";
import FilterDrawer from "./Components/FilterDrawer";
import noDataImage from "../../../assets/no-data.png";
import { customToast } from "src/components/Toast";

const initialFilters = {
  maritalStatus: "",
  height: "",
  heightValue: "",
  agefrom: "",
  ageTo: "",
  religion: "",
  caste: "",
};
const Home: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { getUserList, userList, getUserListVirtulized, listLoading } =
    homeStore((state) => state);
  const { isLoading } = genericStore((state) => state);
  const { userId } = authStore((state) => state);
  const { personalDetails, getProfileDetails } = profileStore((state) => state);
  const [menuOpen, setmenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const scrollContainerRef = useRef(null);
  const [filterDisplay, setfilterDisplay] = useState(false);
  const [filters, setfilters] = useState(initialFilters as any);

  useEffect(() => {
    const payload = {
      ...filters,
      registerId: userId,
      searchtype: "P",
      limitBy: 15,
      page: 1,
      weight: "",
      caste: "",
      anualIncome: 0,
    };
    if (userId) {
      getUserList(payload);
    }
  }, [userId, filters]);

  useEffect(() => {
    if (userId) {
      getProfileDetails({ registerId: userId });
    }
  }, [userId]);

  const profileImage = personalDetails?.imageInfo?.image
    ? `${IMG_BASE_URL}${personalDetails?.imageInfo?.image}`
    : DefaultProfile;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); // Fetch data when the page state changes

  const fetchData = async () => {
    const payload = {
      ...filters,
      registerId: userId,
      searchtype: "P",
      limitBy: 15,
      page: page,
      weight: "",
      caste: "",
      anualIncome: 0,
    };
    if (userId) {
      getUserListVirtulized(payload);
    }
  };

  function hasValue(data: any) {
    // Use Object.values() to get an array of values from the object
    const values = Object.values(data);

    // Check if any value in the array is truthy (not empty, null, undefined, etc.)
    return values.some((value) => Boolean(value));
  }

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

    if (scrollPercentage > 90 && !isLoading) {
      setPage((prevPage) => prevPage + 1); // Increment page number to fetch next set of data
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    (scrollContainer as any).addEventListener("scroll", handleScroll);
    return () => {
      (scrollContainer as any).removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
          color: "black",
          display: "flex",
        }}
      >
        <Menu
          isOpen={menuOpen}
          onClose={() => setmenuOpen(false)}
          onOpen={() => setmenuOpen(true)}
        >
          <div className="burger-menu">
            <MdClose className="burger-close-btn" color="white" />
            <div className="sidebar">
              <div className="profile-photo">
                <Image src={profileImage} preview={false} />
                <div className="my-details">
                  <div className="profile-details">
                    <h1>{personalDetails?.registerInfo?.name}</h1>
                    <p className="profile-id">
                      Profile ID :{" "}
                      <span>
                        {personalDetails?.registerInfo?.loginProfileId}
                        <FaCopy
                          onClick={() => {
                            navigator.clipboard.writeText(
                              personalDetails?.registerInfo?.loginProfileId
                            );
                            customToast(
                              SUCCESS,
                              "Profile ID Copied to Clipboard"
                            );
                          }}
                        />
                      </span>
                    </p>
                    <Link to="/profile">
                      <div className="home-buttons-wrap">
                        <TbUserEdit color="white" />
                        <p>Edit Profile</p>
                      </div>
                    </Link>
                    <div className="home-buttons-wrap">
                      <FaRegEdit color="white" />
                      <p>Edit Preference</p>
                    </div>
                    {/* <div className="home-buttons-wrap">
                  <IoMdPlanet color="white" />
                  <p>Edit Profile</p>
                </div> */}
                    <div className="home-buttons-wrap">
                      <MdDoneAll color="white" />
                      <p>Verify Your Profile</p>
                    </div>
                    <div className="border-line"></div>
                    <div className="home-buttons-wrap">
                      <MdOutlineSettings color="white" />
                      <p>Settings</p>
                    </div>
                    <div className="home-buttons-wrap">
                      <FaHandsHelping color="white" />
                      <p>Help</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Menu>
        <div className="menu-button" onClick={() => setmenuOpen(true)}>
          <MdOutlineMenu />
        </div>
        <div className="sidebar">
          <div className="profile-photo">
            <Image src={profileImage} preview={false} />
            <div className="my-details">
              <div className="profile-details">
                <h1>{personalDetails?.registerInfo?.name}</h1>
                <p className="profile-id">
                  Profile ID :{" "}
                  <span>
                    {personalDetails?.registerInfo?.loginProfileId}
                    <FaCopy
                      onClick={() => {
                        navigator.clipboard.writeText(
                          personalDetails?.registerInfo?.loginProfileId
                        );
                        customToast(SUCCESS, "Profile ID Copied to Clipboard");
                      }}
                    />
                  </span>
                </p>
                <Link to="/profile">
                  <div className="home-buttons-wrap">
                    <TbUserEdit color="white" />
                    <p>Edit Profile</p>
                  </div>
                </Link>
                <div className="home-buttons-wrap">
                  <FaRegEdit color="white" />
                  <p>Edit Preference</p>
                </div>
                {/* <div className="home-buttons-wrap">
                  <IoMdPlanet color="white" />
                  <p>Edit Profile</p>
                </div> */}
                <div className="home-buttons-wrap">
                  <MdDoneAll color="white" />
                  <p>Verify Your Profile</p>
                </div>
                <div className="border-line"></div>
                <div className="home-buttons-wrap">
                  <MdOutlineSettings color="white" />
                  <p>Settings</p>
                </div>
                <div className="home-buttons-wrap">
                  <FaHandsHelping color="white" />
                  <p>Help</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-user-list" ref={scrollContainerRef}>
          {listLoading ? (
            <Skeleton active />
          ) : (
            <div className="home-user-list-container">
              {!!userList?.length && (
                <div className="filter-btns-container">
                  <CustomButton
                    text="Reset Filter"
                    onClick={() => setfilters(initialFilters)}
                    extraClassName={"filter-btn"}
                    disabled={!hasValue(filters)}
                  />
                  <Badge dot={hasValue(filters) ? true : false}>
                    <CustomButton
                      text="Filter"
                      onClick={() => setfilterDisplay(true)}
                      extraClassName={"filter-btn"}
                      primary
                    />
                  </Badge>
                </div>
              )}
              {userList?.length ? (
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  {userList?.map((res: any, index: number) => (
                    <Col
                      className="gutter-row"
                      style={{ marginBottom: "24px" }}
                      xs={{ flex: "100%" }}
                      sm={{ flex: "100%" }}
                      md={{ flex: "50%" }}
                      lg={{ flex: "50%" }}
                      xl={{ flex: "32%" }}
                      key={index}
                    >
                      <UserCards
                        image={res.image}
                        name={res?.name}
                        phone="12312312323423"
                        district={res?.district}
                        height={res?.height}
                        weight={res?.weight}
                        age={moment().diff(res?.dob, "years")}
                        cast={res?.castename}
                        occupation={res?.occupation}
                        education={res?.educationDetail}
                        userId={res?.registerId}
                        profileId={res?.loginProfileId}
                      ></UserCards>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="no-data-container">
                  <div className="no-data-wrap">
                    <img src={noDataImage} />
                    <span>No data available</span>
                  </div>
                </div>
              )}
            </div>
          )}
          {isLoading && (
            <Loader
              type="box-up"
              bgColor="#ffc107"
              color="#ffc107"
              title={""}
              size={100}
            />
          )}
        </div>
      </div>
      <FilterDrawer
        visible={filterDisplay}
        visibleFn={setfilterDisplay}
        setfilters={setfilters}
        appliedFilters={filters}
      />
      {/* // <Footer style={{ textAlign: "center" }}>Matrimonial website</Footer> */}
    </>
  );
};

export default Home;
