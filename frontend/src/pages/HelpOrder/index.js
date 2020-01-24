/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  helpOrderSearchRequest,
  helpOrderCreateRequest
} from "../../store/modules/helpOrder/actions";

import Modal from "../../components/modal";
import Header from "../../components/base/header";
import BaseContent from "../../components/base/baseContent";
import Content from "../../components/content";
import Table from "../../components/table/structure";
import Loading from "../../components/loading";
import ListController from "../../components/ListController";
import TableGenerator from "../../components/table/tableGenerator";

export default function HelpOrder() {
  const dispatch = useDispatch();
  const helpOrders = useSelector(state => state.helpOrder.helpOrders);
  const [totalPages, setTotalPages] = useState();

  function handleUpdateList(page) {
    dispatch(helpOrderSearchRequest({ page }));
  }

  useEffect(() => {
    dispatch(helpOrderSearchRequest({ page: helpOrders.page }));

    if (helpOrders.count <= 10) {
      handleUpdateList(1);
    }

    setTotalPages(Math.ceil(helpOrders.count / 10, 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, helpOrders.count, helpOrders.page]);

  async function confirmAnswer(data) {
    const response = await Modal(data);

    if (response) {
      dispatch(helpOrderCreateRequest({ id: data.id, answer: response }));
    }
  }

  return (
    <>
      <BaseContent>
        <Header>
          <h1>Pedidos de auxílio</h1>
        </Header>

        <Content>
          <Table>
            {!helpOrders.loading ? (
              <>
                <thead>
                  <tr>
                    <th>ALUNO</th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {helpOrders.list.map(helpOrder => (
                    <TableGenerator
                      key={helpOrder.id}
                      data={helpOrder}
                      path={`/helpOrders/edit/${helpOrder.id}`}
                      onConfirm={() =>
                        confirmAnswer({
                          id: helpOrder.id,
                          input: "textarea",
                          title: "PERGUNTA DO ALUNO",
                          inputPlaceholder: "Sua resposta",
                          text: helpOrder.question,
                          cancelText: "Cancelar",
                          showCancelButton: true,
                          confirmButtonText: "Responder",
                          showLoaderOnConfirm: true,
                          finalText: "Aluno respondido com sucesso!",
                          inputValidator: value => {
                            if (!value) {
                              return "Não atende aos requisitos";
                            }
                          }
                        })
                      }
                      fields={["student", "question"]}
                    />
                  ))}
                </tbody>
              </>
            ) : (
              <Loading loading={helpOrders.loading} />
            )}
          </Table>
          {!helpOrders.loading ? (
            <ListController
              empty={helpOrders.list.length > 0}
              next={() => handleUpdateList(helpOrders.page + 1)}
              back={() => handleUpdateList(helpOrders.page - 1)}
              disableBack={helpOrders.page < 2}
              disableNext={helpOrders.page === totalPages}
              page={helpOrders.page}
            />
          ) : null}
        </Content>
      </BaseContent>
    </>
  );
}
