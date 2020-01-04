import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Form } from "@rocketseat/unform";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { MdAdd, MdKeyboardBackspace } from "react-icons/md";
import {
  studentUpdateRequest,
  studentCreateRequest
} from "../../../store/modules/student/actions";

import api from "../../../services/api";
import Header from "../../../components/base/header";
import BaseContent from "../../../components/base/baseContent";
import Content from "../../../components/content";
import CustomButton from "../../../components/buttons/customButton";
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
    .positive("Insira um numero válido")
    .max(120, "Idade inválida")
    .required("A idade é obrigatória")
    .typeError("A idade é obrigatória"),
  weight: Yup.number("Insira um número válido")
    .required("O peso obrigatório")
    .positive("Insira um numero válido")
    .typeError("O peso é obrigatório"),
  height: Yup.number("Insira um número válido")
    .required("A altura é obrigatória")
    .positive("Insira um numero válido")
    .typeError("A altura é obrigatória")
});

export default function StudentForm() {
  const [student, setStudent] = useState();
  const { id } = useParams();

  const loading = useSelector(state => state.student.students.loading);
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function searchStudent() {
    try {
      const response = await api.get(`/students/${id}`);
      return setStudent(response.data);
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    if (id) {
      searchStudent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleSubmit({ email, name, weight, height, age }) {
    if (id) {
      dispatch(studentUpdateRequest({ id, email, name, weight, height, age }));
    } else {
      dispatch(studentCreateRequest({ email, name, weight, height, age }));
    }
  }

  return (
    <BaseContent>
      <Header>
        <h1>{id ? "Editar um aluno" : "Cadastro de aluno"}</h1>
        <div>
          <Link to="/students/list">
            <CustomButton
              desc="VOLTAR"
              color={colors.buttonPageHeaderSecondary}
              type="button"
            >
              <MdKeyboardBackspace size={24} color="#fff" />
              VOLTAR
            </CustomButton>
          </Link>
          <CustomButton
            form="form"
            bool={loading}
            loading={loading}
            color={colors.buttonPageHeaderPrimary}
            type="submit"
          >
            <MdAdd size={24} color="#fff" />
            SALVAR
          </CustomButton>
        </div>
      </Header>
      <Content>
        <Form
          id="form"
          initialData={student}
          schema={schema}
          onSubmit={handleSubmit}
        >
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
            <InputLabel
              placeholder="Sua idade"
              type="number"
              desc="IDADE"
              name="age"
            />
            <InputLabel
              step="0.1"
              placeholder="Seu peso. Ex: 99,9"
              type="number"
              desc="PESO (em kg)"
              name="weight"
            />
            <InputLabel
              step="0.01"
              placeholder="Sua altura. Ex: 1,75"
              type="number"
              desc="ALTURA"
              name="height"
            />
          </Container>
        </Form>
      </Content>
    </BaseContent>
  );
}
