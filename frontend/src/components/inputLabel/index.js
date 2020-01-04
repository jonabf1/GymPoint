import React from "react";
import PropTypes from "prop-types";
import { Label, NewInput } from "./styles";

export default function InputLabel({
  step,
  type,
  name,
  placeholder,
  desc,
  ...rest
}) {
  return (
    <div>
      {desc && <Label htmlFor={name}>{desc}</Label>}

      <NewInput
        step={step}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </div>
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
  placeholder: undefined,
  step: 0
};
