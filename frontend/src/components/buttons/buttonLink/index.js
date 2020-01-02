import React from "react";
import PropTypes from "prop-types";
import { ButtonLink } from "./styles";

export default function ButtonTable({ children, ...rest }) {
  return (
    <>
      <ButtonLink {...rest}>{children}</ButtonLink>
    </>
  );
}

ButtonTable.propTypes = {
  children: PropTypes.element.isRequired
};
