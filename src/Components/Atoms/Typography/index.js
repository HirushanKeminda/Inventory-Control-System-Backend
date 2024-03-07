import React from "react";

const TypographyTypeMapper = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
};

export const Typography = (props) => {
  const Component = TypographyTypeMapper[props.variant];
  return <Component>{props.label}</Component>;
};
