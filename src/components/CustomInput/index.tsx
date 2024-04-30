import "./index.scss";
interface inputProps {
  value?: string | number;
  placeHolder: string;
  onChange?: any;
  type?: string;
  style?: any;
  name?: string;
}
export default function CustomInput({
  value,
  placeHolder,
  onChange,
  type,
  style,
  name,
}: inputProps) {
  return (
    <input
      value={value}
      placeholder={placeHolder}
      onChange={onChange}
      type={type ?? "text"}
      className="input-style"
      style={style}
      name={name}
    ></input>
  );
}
