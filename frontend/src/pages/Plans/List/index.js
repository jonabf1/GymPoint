import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MdAdd } from "react-icons/md";
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

export default function PlanList() {
  const dispatch = useDispatch();
  const plans = useSelector(state => state.plan.plans);

  const [totalPages, setTotalPages] = useState();

  function handleUpdateList(page) {
    dispatch(planSearchRequest({ page }));
  }

  useEffect(() => {
    dispatch(planSearchRequest({ page: plans.page }));

    if (plans.count <= 10) {
      handleUpdateList(1);
    }

    setTotalPages(Math.ceil(plans.count / 10, 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, plans.count, plans.page]);

  async function confirmDelete(data) {
    const func = await Modal(data);

    if (func) {
      dispatch(planDeleteRequest({ id: data.id, path: "plans" }));
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
                      path={`/plans/edit/${plan.id}`}
                      onRemove={() => confirmDelete()}
                      onConfirm={() =>
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
                      fields={["title", "formattedDuration", "formattedPrice"]}
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
              next={() => handleUpdateList(plans.page + 1)}
              back={() => handleUpdateList(plans.page - 1)}
              disableBack={plans.page < 2}
              disableNext={plans.page === totalPages}
              page={plans.page}
            />
          ) : null}
        </Content>
      </BaseContent>
    </>
  );
}
