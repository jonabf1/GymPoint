import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "@rocketseat/unform";
import * as Yup from "yup";
import InputLabel from "../../components/inputLabel";
import CustomButtom from "../../components/buttons/customButton";
import logo from "../../assets/logo.svg";
import { signInRequest } from "../../store/modules/auth/actions";
import colors from "../../styles/colors";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string()
    .min(6, "Insira uma senha válida")
    .required("A senha é obrigatória")
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
        <img src={logo} alt="logo" />
        <InputLabel
          placeholder="exemplo@gmail.com"
          name="email"
          desc="SEU E-MAIL"
          type="email"
        />
        <InputLabel
          name="password"
          placeholder="*********"
          desc="SUA SENHA"
          type="password"
        />
        <CustomButtom
          loading={loading}
          type="submit"
          bool={loading}
          color={colors.backgroundAuth}
        >
          Entrar no sistema
        </CustomButtom>
      </Form>
    </>
  );
}
