import styled from "styled-components";
import { NavLink } from "react-router-dom";
import colors from "../../styles/colors";

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;

  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
`;

export const Link = styled(NavLink)`
  font-weight: bold;
`;

export const Content = styled.div`
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  aside {
    display: flex;
    align-items: center;

    img {
      margin-right: 30px;
      padding: 4px 30px 4px 0px;
      border-right: 1px solid #dddddd;
    }

    a {
      font-weight: bold;
      color: ${colors.linksHeader};
      font-size: 1.5rem;
      margin-right: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;

  button {
    display: block;
    border: 0;
    background: none;
    align-self: flex-end;
    color: ${colors.buttonHeader};
  }

  strong {
    display: block;
    color: ${colors.strongHeader};
    margin-bottom: 5px;
    font-size: 1.4rem;
  }
`;
