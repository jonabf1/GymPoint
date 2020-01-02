import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Form } from "@rocketseat/unform";

import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  studentUpdateRequest,
  studentCreateRequest
} from "../../../store/modules/student/actions";

import api from "../../../services/api";
import Header from "../../../components/base/header";
import BaseContent from "../../../components/base/baseContent";
import Content from "../../../components/content";
import Button from "../../../components/buttons/customButton";
import InputLabel from "../../../components/inputLabel";

import colors from "../../../styles/colors";

import { Container } from "./styles";

const schema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  age: Yup.number()
    .min(10, "A idade deve ser maior que 10 anos")
    .max(120, "Idade inválida")
    .required("A idade é obrigatória"),
  weight: Yup.number().required("O peso é obrigatório"),
  height: Yup.number().required("A altura é obrigatória")
});

export default function StudentForm() {
  const [student, setStudent] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function searchStudent() {
    const response = await api.get(`/students/${id}`);
    setStudent(response.data);
  }

  useEffect(() => {
    if (id) {
      searchStudent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleSubmit({ email, name, weight, height, age }) {
    if (id) {
      dispatch(studentUpdateRequest({ email, name, weight, height, age, id }));
    } else {
      dispatch(studentCreateRequest({ email, name, weight, height, age }));
    }
  }

  return (
    <Form initialData={student} schema={schema} onSubmit={handleSubmit}>
      <BaseContent>
        <Header>
          <h1>{id ? "Editar um aluno" : "Cadastro de aluno"}</h1>

          <div>
            <Link to="/students/list">
              <Button
                desc="VOLTAR"
                color={colors.buttonPageHeaderSecondary}
                type="button"
              >
                VOLTAR
              </Button>
            </Link>
            <Button color={colors.buttonPageHeaderPrimary} type="submit">
              SALVAR
            </Button>
          </div>
        </Header>
        <Content>
          <InputLabel
            desc="NOME COMPLETO"
            type="text"
            name="name"
            placeholder="Seu nome"
          />
          <InputLabel
            desc="ENDEREÇO DE E-MAIL"
            type="email"
            name="email"
            placeholder="Seu e-mail"
          />
          <Container>
            <InputLabel type="number" desc="IDADE" name="age" />
            <InputLabel
              step="0.1"
              type="number"
              desc="PESO (em kg)"
              name="weight"
            />
            <InputLabel step="0.1" type="number" desc="ALTURA" name="height" />
          </Container>
        </Content>
      </BaseContent>
    </Form>
  );
}
