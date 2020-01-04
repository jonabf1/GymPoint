import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 0 20px 0;
  width: 100%;

  button {
    margin-left: 15px;

    &:first-child {
      margin: 0;
    }
  }

  h1 {
    margin-right: 40px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
