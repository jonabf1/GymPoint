import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form } from "@rocketseat/unform";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import { MdAdd, MdKeyboardBackspace } from "react-icons/md";

import {
  enrollmentUpdateRequest,
  enrollmentCreateRequest
} from "../../../store/modules/enrollment/actions";

import api from "../../../services/api";
import Header from "../../../components/base/header";
import BaseContent from "../../../components/base/baseContent";
import Content from "../../../components/content";
import ButtonLink from "../../../components/buttons/ButtonLink";
import CustomButton from "../../../components/buttons/customButton";
import InputLabel from "../../../components/inputLabel";

import colors from "../../../styles/colors";
import { Container } from "./styles";

export default function EnrollmentForm() {
  const { id } = useParams();
  const enrollment = useSelector(state => state.enrollment.enrollments);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [planSelected, setPlanSelected] = useState();
  const [studentSelected, setStudentSelected] = useState();
  const [optionsPlan, setOptionsPlan] = useState();
  const [optionsStudent, setOptionsStudent] = useState();
  const [studentSearchName, setStudentSearchName] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function searchEnrollment() {
    try {
      const response = await api.get(`/enrollments/${id}`);
      return setData(response.data);
    } catch (err) {
      return err;
    }
  }

  async function getStudents() {
    try {
      const response = await api.get(`/students`);
      return setOptionsStudent(response.data.rows);
    } catch (err) {
      return err;
    }
  }

  async function getPlans() {
    try {
      const response = await api.get(`/plans`);
      return setOptionsPlan(response.data.rows)
    } catch (err) {
      return err;
    }
  }

  async function loadStudents() {
    try{
    const response = await api.get(`/students?name=${studentSearchName}`);
    return response.data.rows;}
    catch(err){
      return err;
    }
  }

  useEffect(() => {
    if (id) {
      searchEnrollment();
    }
    getPlans();
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleSubmit(data) {
    if (id) {
      const { title } = data;
      dispatch(
        enrollmentUpdateRequest({
          id
        })
      );
    } else {
      const { title } = data;
      dispatch(
        enrollmentCreateRequest({
          title
        })
      );
    }
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "blue"
    }),
    control: styles => ({
      ...styles,
      width: 200,
      marginRight: 10
    })
  };

  return (
    <BaseContent>
      <Header>
        <h1>{id ? "Edição de matrícula" : "Cadastro de matrícula"}</h1>
        <div>
          <ButtonLink
            to="/enrollments/list"
            desc="VOLTAR"
            color={colors.buttonPageHeaderSecondary}
            type="button"
          >
            <MdKeyboardBackspace size={24} color="#fff" />
            VOLTAR
          </ButtonLink>

          <CustomButton
            form="form"
            loading={enrollment.loading}
            bool={enrollment.loading}
            color={colors.buttonPageHeaderPrimary}
            type="submit"
          >
            <MdAdd size={24} color="#fff" />
            SALVAR
          </CustomButton>
        </div>
      </Header>
      <Content>
        <Form id="form" initialData={'s'} schema="schema" onSubmit={handleSubmit}>
           <AsyncSelect
            placeholder="Selecione o aluno"
            defaultValue={null}
            options={optionsStudent}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            noOptionsMessage={() => "Nenhum estudante cadastrado"}
            onChange={s => setStudentSelected(s.id)}
            onInputChange={v => setStudentSearchName(v)}
          />

          <Container>
            <Select
              options={optionsPlan}
              defaultValue={null}
              styles={customStyles}
              getOptionLabel={option => option.title}
              getOptionValue={option => option.id}
              placeholder="Selecione o plano"
              noOptionsMessage={() => "Nenhum plano cadastrado"}
              loadingMessage={() => "Carregando..."}
              onChange={e => setPlanSelected(e)}
            />

            <InputLabel desc="DATA DE INICIO" type="date" name="date" />
            <InputLabel
              desc="DATA DE TÉRMINO"
              type="date"
              name="final_date"
              disabled
            />

            <InputLabel
              type="text"
              value={planSelected.price || 0}
              desc="VALOR FINAL"
              name="totalPrice"
              disabled
            />
          </Container>
        </Form>
      </Content>
    </BaseContent>
  );
}
