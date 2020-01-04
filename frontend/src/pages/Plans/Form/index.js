import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import { Form } from "@rocketseat/unform";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { MdAdd, MdKeyboardBackspace } from "react-icons/md";
import {
  planUpdateRequest,
  planCreateRequest
} from "../../../store/modules/plan/actions";

import api from "../../../services/api";
import Header from "../../../components/base/header";
import BaseContent from "../../../components/base/baseContent";
import Content from "../../../components/content";
import ButtonLink from "../../../components/buttons/ButtonLink";
import CustomButton from "../../../components/buttons/customButton";
import InputLabel from "../../../components/inputLabel";

import colors from "../../../styles/colors";

import { Container } from "./styles";

import { formatPrice } from "../../../util/format";

const schema = Yup.object().shape({
  title: Yup.string().required("O nome é obrigatório"),
  duration: Yup.number()
    .min(1, "A duração é de no minimo um mês")
    .positive("Insira um número válido")
    .required("A duração é obrigatória")
    .typeError("A duração é obrigatória"),
  price: Yup.number("Insira um número válido")
    .required("O preço obrigatório")
    .positive("Insira um numero válido")
    .typeError("O preço é obrigatório")
});

export default function PlanForm() {
  const [plan, setPlan] = useState();
  const [price, setPrice] = useState();
  const [duration, setDuration] = useState();

  const { id } = useParams();

  const loading = useSelector(state => state.plan.plans.loading);

  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function searchPlan() {
    try {
      const response = await api.get(`/plans/${id}`);
      setPrice(response.data.price);
      setDuration(response.data.duration);
      return setPlan(response.data);
    } catch (err) {
      return err;
    }
  }

  const TotalPrice = useMemo(() => price * duration, [price, duration]);

  useEffect(() => {
    if (id) {
      searchPlan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleSubmit(data) {
    if (id) {
      const { title } = data;
      dispatch(planUpdateRequest({ price, title, duration, id }));
    } else {
      dispatch(planCreateRequest(data));
    }
  }

  return (
    <BaseContent>
      <Header>
        <h1>{id ? "Edição de plano" : "Cadastro de plano"}</h1>
        <div>
          <ButtonLink
            to="/plans/list"
            desc="VOLTAR"
            color={colors.buttonPageHeaderSecondary}
            type="button"
          >
            <MdKeyboardBackspace size={24} color="#fff" />
            VOLTAR
          </ButtonLink>

          <CustomButton
            form="form"
            loading={loading}
            bool={loading}
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
          initialData={plan}
          schema={schema}
          onSubmit={handleSubmit}
        >
          <InputLabel
            desc="TITULO DO PLANO"
            type="text"
            name="title"
            placeholder="Nome do plano"
          />
          <Container>
            <InputLabel
              desc="DURAÇÃO (em meses)"
              type="number"
              name="duration"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              placeholder="Duração em meses"
            />
            <InputLabel
              placeholder="Preço mensal do novo plano"
              type="number"
              desc="PREÇO MENSAL"
              name="price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <InputLabel
              placeholder={isNaN(TotalPrice) ? "0" : formatPrice(TotalPrice)}
              type="text"
              disabled
              desc="PREÇO TOTAL"
              name="totalPrice"
            />
          </Container>
        </Form>
      </Content>
    </BaseContent>
  );
}
