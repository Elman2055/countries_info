import React from "react";
import "./InputName.scss";

type TInputName = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputName = (props: TInputName) => {
  return (
    <>
      <input
        type="text"
        className="countrySearchInput"
        placeholder="Search"
        onChange={props.onChange}
      />
    </>
  );
};

export default InputName;
