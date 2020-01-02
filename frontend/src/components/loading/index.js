import React from "react";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";
import { Container } from "./styles";
import color from "../../styles/colors";

export default function Loading({ loading }) {
  return (
    <>
      <Container loading={loading}>
        {loading && (
          <FaSpinner color={color.buttonPageHeaderPrimary} size={35} />
        )}
      </Container>
    </>
  );
}

Loading.propTypes = {
  loading: PropTypes.bool
};

Loading.defaultProps = {
  loading: false
};
