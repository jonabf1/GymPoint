import styled from "styled-components";
import { lighten } from "polished";
import colors from "../../../styles/colors";

export const Container = styled.div`
  background: linear-gradient(
    -90deg,
    ${colors.backgroundAuth},
    ${lighten(0.01, colors.backgroundAuth)}
  );
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  max-width: 360px;
  width: 100%;
  border-radius: 4px;
  background: #fff;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-top: 20px;
    padding: 30px;

    button {
      margin-top: 15px;
      text-align: center;
      height: 45px !important;
      width: 100% !important;
    }

    img {
      margin-bottom: 10px;
    }
  }
`;
