import { Modal } from "antd";
import ImageGallery from "react-image-gallery";
import { IMG_BASE_URL } from "src/config/app.const";

interface ImageGalleryComponent {
  setVisible: any;
  isVisible: boolean;
  images: any;
}
export default function ImageGalleryComponent({
  setVisible,
  isVisible,
  images,
}: ImageGalleryComponent) {
  const generateImageArray = (images: any) => {
    console.log(images, "imagesArray1");
    return (
      images &&
      Object.values(images)
        .filter((src) => src !== null)
        .map((src) => ({
          original: IMG_BASE_URL + src,
          thumbnail: IMG_BASE_URL + src, // Assuming thumbnails are the same as the original images
        }))
    );
  };

  const imagesArray = generateImageArray(images);
  return (
    <Modal
      open={isVisible}
      onCancel={() => setVisible(false)}
      footer={null}
      closeIcon={null}
    >
      <ImageGallery items={imagesArray} showPlayButton={false} />
    </Modal>
  );
}
