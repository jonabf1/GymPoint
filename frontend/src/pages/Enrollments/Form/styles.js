import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-end;

  div {
    margin-right: 5px;
    &:last-child {
      margin: 0;
    }
  }
`;
