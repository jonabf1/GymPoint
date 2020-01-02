import styled from "styled-components";
import color from "../../../styles/colors";

export const Container = styled.div`
  display: inline-block;
`;

export const ManageList = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  p {
    color: ${color.labelAuth};
    margin: 0 20px 0 20px;
    font-size: 1.8rem;
    font-weight: 500;
  }

  svg {
    cursor: pointer;
  }
`;
