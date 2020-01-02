import React from "react";
import PropTypes from "prop-types";
import { Container, Wrapper } from "./styles";

export default function BaseContent({ children }) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}

BaseContent.propTypes = {
  children: PropTypes.element.isRequired
};
