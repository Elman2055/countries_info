import React from "react";
import { TInfo } from "../interfaces/ComponentsData";
import "./CountryInfo.scss";

const CountryInfo = (props: TInfo) => {
  return (
    <div className="countryInfo">
      <div className="infoFlex">
        <div>
          <h1 className="country">{props.country}</h1>
          <h3>Capital: {props.capital}</h3>
          <h3>Population: {props.population}</h3>
          <h3>Area: {props.area} км²</h3>
          <h3>Region: {props.region}</h3>
        </div>
        <div>
          <img src={props.srcImg} alt="flag" />
        </div>
      </div>
      <div>
        <h2 className="borderMargin">Borders with:</h2>
        <h4>
          <li>{props.borders}</li>
        </h4>
      </div>
    </div>
  );
};

export default CountryInfo;
