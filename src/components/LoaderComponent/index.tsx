import Loader from "react-js-loader";
import LoaderImage from "../../assets/loader.jpeg";
import "./index.scss";

export default function LoaderComponent() {
  return (
    <div className="loader-wrap">
      <div>
        <img src={LoaderImage} />
        <div className={"item"}>
          <Loader
            type="box-up"
            bgColor="#ffc107"
            color="#ffc107"
            title={""}
            size={100}
          />
        </div>
      </div>
    </div>
  );
}
