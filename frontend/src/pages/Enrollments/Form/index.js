import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Form } from "@rocketseat/unform";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { MdAdd, MdKeyboardBackspace } from "react-icons/md";
import DatePicker from "react-datepicker";

import { addMonths, format } from "date-fns";
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
import { Label } from "../../../components/inputLabel/styles";

import colors from "../../../styles/colors";
import { Container } from "./styles";
import { formatPrice } from "../../../util/format";
import schema from "../../../validators/enrollments";
import customStyles from "./selectStyle";

export default function EnrollmentForm() {
  const { id } = useParams();
  const enrollment = useSelector(state => state.enrollment.enrollments);
  const dispatch = useDispatch();

  const [userByID, setUserByID] = useState({});
  const [planSelected, setPlanSelected] = useState({});
  const [studentSelected, setStudentSelected] = useState();
  const [dateSelected, setDateSelected] = useState(new Date());
  const [optionsPlan, setOptionsPlan] = useState();
  const [optionsStudent, setOptionsStudent] = useState();

  const final_date = useMemo(
    () => addMonths(dateSelected, planSelected.duration || 0),
    [dateSelected, planSelected.duration]
  );

  async function searchUserByEnrollment() {
    try {
      const response = await api.get(`/enrollments/${id}`);
      const user = await api.get(`/students/${response.data.student_id}`);
      return setUserByID(user.data);
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
      return setOptionsPlan(response.data.rows);
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    if (id) {
      searchUserByEnrollment();
    }
    getPlans();
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleSubmit() {
    const object = {
      student_id: id ? userByID.id : studentSelected.id,
      plan_id: planSelected.id,
      start_date: dateSelected
    };

    if (id) {
      dispatch(enrollmentUpdateRequest(object));
    } else {
      dispatch(enrollmentCreateRequest(object));
    }
  }

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
            onClick={handleSubmit}
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
        <Form schema={schema} onSubmit={handleSubmit}>
          <Select
            name="student"
            placeholder={userByID.name || "Procurar o aluno"}
            isDisabled={userByID.name && true}
            defaultValue={null}
            options={optionsStudent}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            noOptionsMessage={() => "Nenhum estudante cadastrado"}
            onChange={s => setStudentSelected(s)}
          />
          <Container>
            <Select
              name="plan"
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

            <div>
              <Label>DATA DE INICIO</Label>
              <DatePicker
                name="date"
                selected={dateSelected}
                minDate={new Date()}
                onChange={e => setDateSelected(e)}
                dateFormat="dd/MM/yyyy"
              />
            </div>

            <InputLabel
              desc="DATA DE TÉRMINO"
              type="text"
              name="final_date"
              placeholder={
                planSelected.title ? format(final_date, "dd/MM/yyyy") : "-"
              }
              disabled
            />

            <InputLabel
              type="text"
              placeholder={
                planSelected.price
                  ? formatPrice(planSelected.price)
                  : formatPrice(0)
              }
              desc="VALOR MENSAL"
              name="totalPrice"
              disabled
            />
          </Container>
        </Form>
      </Content>
    </BaseContent>
  );
}
