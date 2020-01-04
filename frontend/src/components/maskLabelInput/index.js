import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useField } from "@rocketseat/unform";
import { Label, NewInput } from "./styles";

export default function InputLabel({
  name,
  inputMask,
  maskChar,
  defaultValue,
  desc
}) {
  const { fieldName, registerField, error } = useField(name);
  const [value, setValue] = useState(defaultValue || "");
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: "props.value"
      });
    }
    }, [ref.current]); // eslint-disable-line

  function handleChange(e) {
    return setValue(e.target.value);
  }

  return (
    <div>
      {desc && <Label htmlFor={name}>{desc}</Label>}

      <NewInput
        type="text"
        id={fieldName}
        name={fieldName}
        mask={inputMask}
        maskChar={maskChar}
        value={value}
        onChange={handleChange}
        ref={ref}
      />
    </div>
  );
}

InputLabel.propTypes = {
  name: PropTypes.string.isRequired,
  inputMask: PropTypes.string.isRequired,
  maskChar: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  desc: PropTypes.string
};

InputLabel.defaultProps = {
  desc: undefined,
  defaultValue: "",
  maskChar: "_"
};
