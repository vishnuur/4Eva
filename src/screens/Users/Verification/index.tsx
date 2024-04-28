import { Checkbox, CheckboxProps, Radio } from "antd";
import "./index.scss";

export default function Verification() {
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(e.target.checked);
  };
  return (
    <div className="verification-container">
      <div className="verification-single">
        <p className="verification-title">ID Verification</p>
        <p>
          Select one of the below documents to verify your identity information.
          The document chosen by you will not be shown to other members
        </p>
        <Radio.Group defaultValue="a" buttonStyle="solid">
          <Radio.Button value="a">Hangzhou</Radio.Button>
          <Radio.Button value="b">Shanghai</Radio.Button>
          <Radio.Button value="c">Beijing</Radio.Button>
          <Radio.Button value="d">Chengdu</Radio.Button>
        </Radio.Group>
        <Checkbox onChange={onChange}>
          By uploading my ID, I give my consent for the purpose of verifying my
          profile
        </Checkbox>
      </div>
    </div>
  );
}
