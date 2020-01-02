import React from "react";
import PropTypes from "prop-types";
import { Input } from "@rocketseat/unform";
import { Label } from "./styles";

export default function InputLabel({ step, type, name, placeholder, desc }) {
  return (
    <>
      {desc && <Label htmlFor={name}>{desc}</Label>}

      <Input
        step={step}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
      />
    </>
  );
}

InputLabel.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  desc: PropTypes.string,
  step: PropTypes.number
};

InputLabel.defaultProps = {
  desc: undefined,
  placeholder: undefined
};
