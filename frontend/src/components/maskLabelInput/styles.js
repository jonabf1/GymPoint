import styled, { css } from "styled-components";
import InputMask from "react-input-mask";
import colors from "../../styles/colors";

export const NewInput = styled(InputMask)`
  ${props =>
    props.disabled &&
    css`
      & {
        background: #f5f5f5;

        &::placeholder {
          color: ${colors.labelAuth};
          font-size: 1.7rem;
        }
      }
    `}
`;

export const Label = styled.label`
  margin: 20px 0 10px 0;
  color: ${colors.labelAuth};
  font-weight: bold;
  display: block;
`;
