import React from "react";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";
import { Container } from "./styles";

export default function CustomButton({
  type,
  children,
  color,
  bool,
  width,
  height,
  loading,
  ...rest
}) {
  return (
    <>
      <Container
        width={width}
        height={height}
        bool={bool}
        loading={loading}
        color={color}
        type={type}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {loading ? <FaSpinner color="#fff" size={24} /> : children}
      </Container>
    </>
  );
}

CustomButton.propTypes = {
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  bool: PropTypes.bool,
  loading: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string
};

CustomButton.defaultProps = {
  bool: false,
  loading: false,
  width: undefined,
  height: undefined
};
