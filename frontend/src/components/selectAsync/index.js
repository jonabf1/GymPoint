import React from "react";
import Async from "react-select/async";
import PropTypes from "prop-types";

export default function SelectAsync({
  placeholder,
  onChange,
  loadOptions,
  onInputChange,
  ...rest
}) {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "blue",
      padding: 20
    }),
    control: styles => ({
      ...styles,
      marginLeft: 10,
      width: 200
    })
  };
  return (
    <div>
      <Async
        defaultValue={null}
        loadOptions={loadOptions}
        styles={customStyles}
        onInputChange={onInputChange}
        onChange={onChange}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        placeholder={placeholder}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </div>
  );
}

SelectAsync.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  loadOptions: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};
