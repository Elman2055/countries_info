import React from "react";
import { TName } from "../interfaces/ComponentsData";
import "./CountryName.scss";

const CountryName = (props: TName) => {
  return (
    <div>
      <button className="countryNameText" onClick={props.onClick}>
        {props.name}
      </button>
    </div>
  );
};

export default CountryName;
