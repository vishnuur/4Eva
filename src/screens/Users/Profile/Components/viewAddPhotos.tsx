import { UploadOutlined } from "@ant-design/icons";
import { Image, Modal, Upload } from "antd";
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
  const handleImageUpload = (file: any) => {
    const reader = new FileReader();

    reader.onload = async (event: any) => {
      // event.target.result contains the Base64 encoded image data
      let base64ImageData: any = JSON.stringify(event?.target?.result);
      base64ImageData = base64ImageData.substring(1);

      const payload = {
        registerId: userId,
        image: base64ImageData,
        picIndex: getImageIndex(),
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
            <Image
              src={`${IMG_BASE_URL}${personalDetails?.imageInfo?.image}`}
            />
          </div>
          {personalDetails?.imageInfo?.image2 && (
            <div className="image-container">
              <Image
                src={`${IMG_BASE_URL}${personalDetails?.imageInfo?.image2}`}
              />
            </div>
          )}
          {personalDetails?.imageInfo?.image3 && (
            <div className="image-container">
              <Image
                src={`${IMG_BASE_URL}${personalDetails?.imageInfo?.image3}`}
              />
            </div>
          )}{" "}
          {personalDetails?.imageInfo?.image4 && (
            <div className="image-container">
              <Image
                src={`${IMG_BASE_URL}${personalDetails?.imageInfo?.image4}`}
              />
            </div>
          )}
          {personalDetails?.imageInfo?.image4 === null && (
            <div className="image-container">
              <Upload beforeUpload={handleImageUpload}>
                <button className="add-more-btn">
                  <UploadOutlined />
                  Click to Upload
                </button>
              </Upload>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
