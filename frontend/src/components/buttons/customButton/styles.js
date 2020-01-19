import styled, { keyframes, css } from "styled-components";
import { darken } from "polished";

const rotate = keyframes`
  from{
    transform:rotate(0deg);
  }
  to{
      transform: rotate(360deg)
  }
`;

export const Container = styled.button.attrs(props => ({
  disabled: props.bool
}))`
  padding: 5px;
  width: ${props => (props.width ? props.width : "auto")};
  height: ${props => (props.height ? props.height : "36px")};
  color: #fff;
  font-size: 1.4rem;
  font-weight: bold;
  border: 0;
  background: ${props => (props.color ? props.color : "#fff;")};
  transition: background 0.3s;
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

  ${props =>
    props.color &&
    css`
    &:hover{
      background: ${darken(0.2, props.color)};
    `}

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.4;
  }

  ${props =>
    props.bool &&
    css`
      svg {
        cursor: not-allowed !important;
      }
    `}
`;
