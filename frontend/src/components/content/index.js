import React from "react";
import PropTypes from "prop-types";
import { Container } from "./styles";

export default function Content({ children }) {
  return <Container>{children}</Container>;
}

Content.propTypes = {
  children: PropTypes.element.isRequired
};
