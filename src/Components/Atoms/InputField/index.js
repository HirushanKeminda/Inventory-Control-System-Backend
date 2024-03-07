import React from "react";

export const InputField = (props) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
      className="form-control"
    />
  );
};
