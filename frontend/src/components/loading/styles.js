import styled, { keyframes, css } from "styled-components";

const rotate = keyframes`
  from{
    transform:rotate(0deg);
  }
  to{
      transform: rotate(360deg)
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `};
`;
