import { UploadOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useRef, useState } from "react";
import { MdEditSquare, MdZoomIn } from "react-icons/md";
import { customToast } from "src/components/Toast";
import { ERROR, IMG_BASE_URL, SUCCESS } from "src/config/app.const";
import { saveProfileImage } from "src/services/apis/users/profile";
import authStore from "src/store/users/auth";
import profileStore from "src/store/users/profile";

interface viewModalProps {
  setVisible: any;
  isVisible: boolean;
}
export default function ViewAddPhotos({
  setVisible,
  isVisible,
}: viewModalProps) {
  const { personalDetails, getProfileImageDetails } = profileStore(
    (state) => state
  );
  const { userId } = authStore((state) => state);
  const fileInputRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentViewImage, setcurrentViewImage] = useState("");

  const showModal = (imageValue: string) => {
    setIsModalVisible(true);
    setcurrentViewImage(imageValue);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getImageIndex = () => {
    let imageIndex = 1;
    if (personalDetails?.imageInfo?.image2 === null) {
      imageIndex = 2;
    } else if (personalDetails?.imageInfo?.image3 === null) {
      imageIndex = 3;
    } else if (personalDetails?.imageInfo?.image4 === null) {
      imageIndex = 4;
    }
    return imageIndex;
  };
  const handleImageUpload = (file: any, imageIndex?: number) => {
    const reader = new FileReader();
    reader.onload = async (event: any) => {
      // event.target.result contains the Base64 encoded image data
      let base64ImageData: any = JSON.stringify(event?.target?.result);
      base64ImageData = base64ImageData.substring(1);

      const payload = {
        registerId: userId,
        image: base64ImageData,
        picIndex: imageIndex,
      };
      if (base64ImageData) {
        const result = await saveProfileImage(payload);
        if (result.status) {
          customToast(SUCCESS, "Photo Uploaded Successfully");
          getProfileImageDetails({ registerId: userId });
        } else {
          customToast(ERROR, result?.result);
        }
      }
    };

    // Read the image file as Data URL
    reader.readAsDataURL(file);
  };

  const onEditIconClicked = () => {
    (fileInputRef as any).current.click();
  };

  return (
    <Modal
      open={isVisible}
      onCancel={() => setVisible(false)}
      width={600}
      title="Add Photos"
      footer={null}
    >
      <div className="list-photos-container">
        <div className="image-container-wrap">
          <div className="image-container">
            <img src={`${IMG_BASE_URL}${personalDetails?.imageInfo?.image}`} />
            <span className="update-image">
              <span style={{ position: "relative" }}>
                <button
                  className="image-hover-button"
                  onClick={() => showModal(personalDetails?.imageInfo?.image)}
                >
                  View
                  <MdZoomIn fill="black" />
                </button>
                <button
                  className="image-hover-button"
                  onClick={onEditIconClicked}
                >
                  Update
                  <MdEditSquare fill="black" />
                </button>
                <input
                  type="file"
                  onChange={(e: any) => handleImageUpload(e.target.files[0], 1)}
                  ref={fileInputRef}
                  accept="image/*"
                />
              </span>
            </span>
          </div>
          {personalDetails?.imageInfo?.image2 && (
            <div className="image-container">
              <img
                src={`${IMG_BASE_URL}${personalDetails?.imageInfo?.image2}`}
              />
              <span className="update-image">
                <span style={{ position: "relative" }}>
                  <button
                    className="image-hover-button"
                    onClick={() =>
                      showModal(personalDetails?.imageInfo?.image2)
                    }
                  >
                    View
                    <MdZoomIn fill="black" />
                  </button>
                  <button
                    className="image-hover-button"
                    onClick={onEditIconClicked}
                  >
                    Update
                    <MdEditSquare fill="black" />
                  </button>
                  <input
                    type="file"
                    onChange={(e: any) =>
                      handleImageUpload(e.target.files[0], 2)
                    }
                    ref={fileInputRef}
                    accept="image/*"
                  />
                </span>
                {/* <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <MdEditSquare />
                </Dropdown> */}
              </span>
            </div>
          )}
          {personalDetails?.imageInfo?.image3 && (
            <div className="image-container">
              <img
                src={`${IMG_BASE_URL}${personalDetails?.imageInfo?.image3}`}
              />
              <span className="update-image">
                <span style={{ position: "relative" }}>
                  <button
                    className="image-hover-button"
                    onClick={() =>
                      showModal(personalDetails?.imageInfo?.image3)
                    }
                  >
                    View
                    <MdZoomIn fill="black" />
                  </button>
                  <button
                    className="image-hover-button"
                    onClick={onEditIconClicked}
                  >
                    Update
                    <MdEditSquare fill="black" />
                  </button>
                  <input
                    type="file"
                    onChange={(e: any) =>
                      handleImageUpload(e.target.files[0], 3)
                    }
                    ref={fileInputRef}
                    accept="image/*"
                  />
                </span>
              </span>
            </div>
          )}{" "}
          {personalDetails?.imageInfo?.image4 && (
            <div className="image-container">
              <img
                src={`${IMG_BASE_URL}${personalDetails?.imageInfo?.image4}`}
              />
              <span className="update-image">
                <span style={{ position: "relative" }}>
                  <button
                    className="image-hover-button"
                    onClick={() =>
                      showModal(personalDetails?.imageInfo?.image4)
                    }
                  >
                    View
                    <MdZoomIn fill="black" />
                  </button>
                  <button
                    className="image-hover-button"
                    onClick={onEditIconClicked}
                  >
                    Update
                    <MdEditSquare fill="black" />
                  </button>
                  <input
                    type="file"
                    onChange={(e: any) =>
                      handleImageUpload(e.target.files[0], 4)
                    }
                    ref={fileInputRef}
                    accept="image/*"
                  />
                </span>
                {/* <Dropdown
                menu={{ items }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <MdEditSquare />
              </Dropdown> */}
              </span>
            </div>
          )}
          {personalDetails?.imageInfo?.image4 === null && (
            <div className="image-container">
              <Upload
                beforeUpload={(e) => handleImageUpload(e, getImageIndex())}
              >
                <button className="add-more-btn">
                  <UploadOutlined />
                  Click to Upload
                </button>
              </Upload>
            </div>
          )}
        </div>
      </div>
      <Modal
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        centered
      >
        <div className="modal-image-container">
          <img
            src={`${IMG_BASE_URL}${currentViewImage}`}
            alt="Profile Zoomed"
            className="modal-image"
          />
        </div>
      </Modal>
    </Modal>
  );
}
