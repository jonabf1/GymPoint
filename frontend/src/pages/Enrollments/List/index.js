import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MdAdd } from "react-icons/md";
import {
  enrollmentSearchRequest,
  enrollmentDeleteRequest
} from "../../../store/modules/enrollment/actions";

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

export default function EnrollmentList() {
  const dispatch = useDispatch();
  const enrollments = useSelector(state => state.enrollment.enrollments);
  const [totalPages, setTotalPages] = useState();

  function handleUpdateList(page) {
    dispatch(enrollmentSearchRequest({ page }));
  }

  useEffect(() => {
    dispatch(enrollmentSearchRequest({ page: enrollments.page }));

    if (enrollments.count <= 10) {
      handleUpdateList(1);
    }

    setTotalPages(Math.ceil(enrollments.count / 10, 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, enrollments.count, enrollments.page]);

  async function confirmDelete(data) {
    const func = await Modal(data);

    if (func) {
      dispatch(enrollmentDeleteRequest({ id: data.id }));
    }
  }

  return (
    <>
      <BaseContent>
        <Header>
          <h1>Gerenciando matrículas</h1>
          <div>
            <Link to="/enrollments/new">
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
            {!enrollments.loading ? (
              <>
                <thead>
                  <tr>
                    <th>ALUNO</th>
                    <th>PLANO</th>
                    <th>INÍCIO</th>
                    <th>TÉRMINO</th>
                    <th>ATIVA</th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {enrollments.list.map(enrollment => (
                    <TableGenerator
                      key={enrollment.id}
                      data={enrollment}
                      onRemove={() => confirmDelete()}
                      path={`/enrollments/edit/${enrollment.id}`}
                      onDelete={() =>
                        confirmDelete({
                          id: enrollment.id,
                          title: "Confirmar exclusão",
                          text: `Deseja deletar a matricula de ${enrollment.student.name}?`,
                          confirmText: "Deletar",
                          cancelText: "Cancelar",
                          icon: "warning",
                          finalText: "Deletado com sucesso!"
                        })
                      }
                      fields={[
                        "owner",
                        "plan",
                        "startDateFormatted",
                        "endDateFormatted",
                        "active"
                      ]}
                    />
                  ))}
                </tbody>
              </>
            ) : (
              <Loading loading={enrollments.loading} />
            )}
          </Table>
          {!enrollments.loading ? (
            <ListController
              empty={enrollments.list.length > 0}
              next={() => handleUpdateList(enrollments.page + 1)}
              back={() => handleUpdateList(enrollments.page - 1)}
              disableBack={enrollments.page < 2}
              disableNext={enrollments.page === totalPages}
              page={enrollments.page}
            />
          ) : null}
        </Content>
      </BaseContent>
    </>
  );
}
