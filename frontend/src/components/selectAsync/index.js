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
  return (
    <div>
      <Async
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        onInputChange={onInputChange}
        onChange={onChange}
        getOptionValue={option => option.id}
        getOptionLabel={option => (option.name ? option.name : option.title)}
        noOptionsMessage={() => "Nenhum registro localizado"}
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
