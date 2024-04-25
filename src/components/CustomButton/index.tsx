import "./index.scss";

interface buttonProps {
  onClick: any;
  text: string;
  disabled?: boolean;
  primary?: boolean;
  style?: any;
}

export default function CustomButton({
  onClick,
  text,
  disabled,
  primary,
  style,
}: buttonProps) {
  return (
    <button
      className={`button-style ${primary ? "primary" : "secondary"}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {text}
    </button>
  );
}
