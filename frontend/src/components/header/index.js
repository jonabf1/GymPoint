import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/logo-header.svg";
import { Container, Profile, Content, Link } from "./styles";
import { signOut } from "../../store/modules/auth/actions";
import color from "../../styles/colors";

export default function Header() {
  const dispatch = useDispatch();

  return (
    <Container>
      <Content>
        <aside>
          <Link to="/home">
            <img src={logo} alt="logo" />
          </Link>
          <nav>
            <Link
              activeStyle={{
                color: color.buttonPageHeaderPrimary
              }}
              to="/students/list"
            >
              ALUNOS
            </Link>
            <Link
              activeStyle={{
                color: color.buttonPageHeaderPrimary
              }}
              to="/plans"
            >
              PLANOS
            </Link>
            <Link
              activeStyle={{
                color: color.buttonPageHeaderPrimary
              }}
              to="/enrollments"
            >
              MATRÍCULAS
            </Link>
            <Link
              activeStyle={{
                color: color.buttonPageHeaderPrimary
              }}
              to="/help-orders"
            >
              PEDIDOS DE AUXÍLIO
            </Link>
          </nav>
        </aside>

        <Profile>
          <strong>Jonathan Barros Franco</strong>
          <button onClick={() => dispatch(signOut())} type="button">
            sair do sistema
          </button>
        </Profile>
      </Content>
    </Container>
  );
}
