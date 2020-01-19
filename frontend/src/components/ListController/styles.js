import styled from "styled-components";
import color from "../../styles/colors";

export const Container = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    border: 0;
    background: none;
  }

  p {
    color: ${color.labelAuth};
    margin: 0 20px 0 20px;
    font-size: 1.8rem;
    font-weight: 500;
  }

  input {
    width: 100%;
  }

  svg {
    cursor: pointer;
  }
`;
