import styled from "styled-components";

export const Container = styled.table`
  border: none;
  background: #fff;
  width: 100%;
  border-radius: 0.4rem;
  padding: 1.5rem;
  border-collapse: collapse;

  tr:last-child td {
    border-bottom: none;
  }

  tr th {
    font-weight: bold;
    font-size: 1.6rem;
    color: #444444;
    text-align: left;
    padding: 0 50px 0 0;
  }

  tr td {
    font-size: 1.6rem;
    padding: 20px 50px 20px 0;
    text-align: left;
    border-bottom: 1px solid #eee;
    color: #666666;
  }
`;
