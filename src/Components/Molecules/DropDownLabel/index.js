import { useState, useEffect } from "react";
import { Typography, InputField, DropDown } from "../../Atoms";

export const DropDownLabel = (props) => {
  return (
    <div className="d-flex flex-column p-2">
      <Typography label={props.typographyLabel} variant="h5" />
      <DropDown data={props.data} setValue={props.setValue} value={props.value} />
    </div>
  );
};
