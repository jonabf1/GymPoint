import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MdAdd } from "react-icons/md";
import {
  helpOrderSearchRequest,
  helpOrderCreateRequest
} from "../../store/modules/helpOrder/actions";

import Modal from "../../components/modal";
import Header from "../../components/base/header";
import BaseContent from "../../components/base/baseContent";
import Content from "../../components/content";
import CustomButton from "../../components/buttons/customButton";
import Table from "../../components/table/structure";
import Loading from "../../components/loading";
import ListController from "../../components/ListController";
import TableGenerator from "../../components/table/tableGenerator";

import colors from "../../styles/colors";

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

  async function confirmDelete(data) {
    const func = await Modal(data);

    if (func) {
      dispatch(helpOrderCreateRequest({ id: data.id }));
    }
  }

  return (
    <>
      <BaseContent>
        <Header>
          <h1>Gerenciando matrículas</h1>
          <div>
            <Link to="/helpOrders/new">
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
                      onRemove={() => confirmDelete()}
                      path={`/helpOrders/edit/${helpOrder.id}`}
                      onConfirm={() =>
                        confirmDelete({
                          id: helpOrder.id,
                          input: "textarea",
                          title: "PERGUNTA DO ALUNO",
                          inputAttributes: {
                            "aria-label": "Sua resposta"
                          },
                          inputPlaceholder: "Sua resposta",
                          text:
                            "Eu me chamo jonathan e nao sei oq fazer e por onde começar?",
                          confirmText: "Deletar",
                          cancelText: "Cancelar",
                          showCancelButton: true,
                          confirmButtonText: "Look up",
                          showLoaderOnConfirm: true,
                          finalText: "Deletado com sucesso!"
                        })
                      }
                      fields={["NAME"]}
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
