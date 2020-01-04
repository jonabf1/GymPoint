import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MdAdd } from "react-icons/md";
import api from "../../../services/api";
import {
  planSearchRequest,
  planDeleteRequest
} from "../../../store/modules/plan/actions";

import Modal from "../../../components/modal";
import Header from "../../../components/base/header";
import BaseContent from "../../../components/base/baseContent";
import Content from "../../../components/content";
import CustomButton from "../../../components/buttons/customButton";
import Table from "../../../components/table/structure";
import Loading from "../../../components/loading";
import ListController from "../../../components/ListController";
import TableGenerator from "../../../components/table/tableGenerator";

import colors from "../../../styles/colors";

import { formatPrice } from "../../../util/format";

export default function PlanList() {
  const dispatch = useDispatch();
  const plans = useSelector(state => state.plan.plans);

  useEffect(() => {
    if (plans.page > 1 && plans.list.length === 0) {
      dispatch(planSearchRequest({ page: plans.page - 1 }));
    }

    dispatch(planSearchRequest({ page: plans.page }));
  }, [dispatch, plans.list.length, plans.page]);

  function handleUpdateList(page) {
    dispatch(planSearchRequest({ page }));
  }

  async function confirmDelete(data) {
    const func = await Modal(data);

    if (func) {
      dispatch(planDeleteRequest(data.id));
    }
  }
  return (
    <>
      <BaseContent>
        <Header>
          <h1>Gerenciando planos</h1>
          <div>
            <Link to="/plans/new">
              <CustomButton
                color={colors.buttonPageHeaderPrimary}
                type="button"
              >
                <MdAdd size={24} color="#fff" />
                CADASTRAR
              </CustomButton>
            </Link>
          </div>
        </Header>

        <Content>
          <Table>
            {!plans.loading ? (
              <>
                <thead>
                  <tr>
                    <th>TÍTULO</th>
                    <th>DURAÇÃO</th>
                    <th>VALOR p/ MÊS</th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {plans.list.map(plan => (
                    <TableGenerator
                      key={plan.id}
                      data={plan}
                      onRemove={() => confirmDelete()}
                      path={`/plans/edit/${plan.id}`}
                      onDelete={() =>
                        confirmDelete({
                          id: plan.id,
                          title: "Confirmar exclusão",
                          text: `Deseja deletar o plano ${plan.title}?`,
                          confirmText: "Deletar",
                          cancelText: "Cancelar",
                          icon: "warning",
                          finalText: "Deletado com sucesso!"
                        })
                      }
                      fields={["title", "duration", "price"]}
                    />
                  ))}
                </tbody>
              </>
            ) : (
              <Loading loading={plans.loading} />
            )}
          </Table>
          {!plans.loading ? (
            <ListController
              empty={plans.list.length > 0}
              onAdd={() => handleUpdateList(plans.page + 1)}
              onRemove={() => handleUpdateList(plans.page - 1)}
              boolAdd={plans.limit}
              boolRemove={plans.page < 2}
              page={plans.page}
            />
          ) : null}
        </Content>
      </BaseContent>
    </>
  );
}
