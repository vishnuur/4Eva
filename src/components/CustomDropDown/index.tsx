import "./index.scss";
interface inputProps {
  options: string[];
  placeHolder: string;
  style?: any;
  onChange: any;
  name: string;
  value?: any;
}
export default function CustomDropDown({
  options,
  placeHolder,
  style,
  onChange,
  name,
  value,
}: inputProps) {
  return (
    <select
      className="dropdown-style"
      style={style}
      onChange={onChange}
      name={name}
      value={value}
    >
      <option>{placeHolder}</option>
      {options.map((res) => (
        <option>{res}</option>
      ))}
    </select>
  );
}
