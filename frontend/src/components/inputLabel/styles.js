import styled, { css } from "styled-components";
import { Input } from "@rocketseat/unform";
import colors from "../../styles/colors";

export const NewInput = styled(Input)`
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
