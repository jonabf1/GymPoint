import styled from "styled-components";
import { Link } from "react-router-dom";

export const ButtonLink = styled(Link)`
  margin-left: 20px;
  font-size: 1.5rem;
  border: 0;
  background: none;
  color: ${props => props.color};
`;
