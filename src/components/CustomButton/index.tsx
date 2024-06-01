import "./index.scss";
import Loader from "react-js-loader";

interface buttonProps {
  onClick: any;
  text: any;
  disabled?: boolean;
  primary?: boolean;
  style?: any;
  extraClassName?: any;
  loader?: boolean;
}

export default function CustomButton({
  onClick,
  text,
  disabled,
  primary,
  style,
  extraClassName,
  loader,
}: buttonProps) {
  return (
    <button
      className={`button-style ${extraClassName} ${
        primary ? "primary" : "secondary"
      }`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {loader ? (
        <Loader
          type="spinner-circle"
          bgColor="#ffc107"
          color="#ffc107"
          title={""}
          size={30}
        />
      ) : (
        text
      )}
    </button>
  );
}
