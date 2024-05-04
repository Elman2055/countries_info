import { TName } from "../interfaces/ComponentsData";
import "./CountryName.scss";

const CountryName = (props: TName) => {
  return (
    <div className="countryNameTextContainer">
      <button className="countryNameText" onClick={props.onClick}>
        {props.name}
      </button>
    </div>
  );
};

export default CountryName;
