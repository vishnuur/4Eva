import "./index.scss";
interface inputProps {
  options: any[];
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
      <option hidden>{placeHolder}</option>
      {options.map((res) => (
        <option value={res.value}>{res.label}</option>
      ))}
    </select>
  );
}
