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
  width: ${props => (props.width ? props.width : "112px")};
  height: ${props => (props.height ? props.height : "36px")};
  color: #fff;
  font-size: 1.4rem;
  font-weight: bold;
  border: 0;
  background: ${props => props.color};
  transition: background 0.3s;
  ${props =>
    props.color &&
    css`
    &:hover{
      background: ${darken(0.2, props.color)};
    `}
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `};

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.bool &&
    css`
      svg {
        cursor: not-allowed !important;
      }
    `}
`;
