import React from "react";
import PropTypes from "prop-types";
import { ButtonLink } from "./styles";

export default function ButtonTable({ children, ...rest }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ButtonLink {...rest}>{children}</ButtonLink>
  );
}

ButtonTable.propTypes = {
  children: PropTypes.element.isRequired
};
