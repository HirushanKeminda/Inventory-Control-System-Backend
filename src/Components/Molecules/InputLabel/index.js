import { useState, useEffect } from "react";
import { Typography, InputField } from "../../Atoms";

export const InputLabel = (props) => {

  return (
    <div className="d-flex flex-column p-2">
      <Typography label={props.typographyLabel} variant="h5" />
      <InputField
        value={props.value}
        placeholder={props.InputFieldPlaceHolder}
        setValue={props.setValue}
      />
    </div>
  );
};
