/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAdd, MdKeyboardBackspace } from "react-icons/md";

import api from "../../../services/api";

import {
  studentSearchRequest,
  studentDeleteRequest
} from "../../../store/modules/student/actions";

import Modal from "../../../components/modal";
import Header from "../../../components/base/header";
import BaseContent from "../../../components/base/baseContent";
import Content from "../../../components/content";
import ButtonLink from "../../../components/buttons/ButtonLink";
import Table from "../../../components/table/structure";
import Loading from "../../../components/loading";
import ListController from "../../../components/ListController";
import AsyncSelect from "../../../components/selectAsync";
import TableGenerator from "../../../components/table/tableGenerator";

import colors from "../../../styles/colors";
import CustomStyle from "./selectStyle";

export default function StudentList() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.student.students);

  const [studentSearchName, setStudentSearchName] = useState();
  const [studentSelected, setStudentSelected] = useState();
  const [totalPages, setTotalPages] = useState();

  function handleUpdateList(page) {
    dispatch(studentSearchRequest({ page }));
  }

  useEffect(() => {
    dispatch(studentSearchRequest({ page: students.page }));

    if (students.count <= 10) {
      handleUpdateList(1);
    }

    setTotalPages(Math.ceil(students.count / 10, 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, students.count, students.page]);

  async function confirmDelete(data) {
    const func = await Modal(data);

    if (func) {
      dispatch(studentDeleteRequest({ id: data.id }));
    }
  }

  async function loadStudents() {
    try {
      const response = await api.get(`/students?name=${studentSearchName}`);
      return response.data.rows;
    } catch (err) {
      return err;
    }
  }

  function generator(data) {
    return (
      <TableGenerator
        key={data.id}
        data={data}
        onSearch={data}
        identify="students"
        onRemove={() => confirmDelete()}
        path={`/students/edit/${data.id}`}
        onConfirm={() =>
          confirmDelete({
            id: data.id,
            title: "Confirmar exclusão",
            text: `Deseja deletar o estudante ${data.name}?`,
            confirmText: "Deletar",
            cancelText: "Cancelar",
            icon: "warning",
            finalText: "Deletado com sucesso!"
          })
        }
        fields={["name", "email", "age"]}
      />
    );
  }

  return (
    <>
      <BaseContent>
        <Header>
          <h1>
            {!studentSelected
              ? "Gerenciando alunos"
              : `Resultados de: ${studentSelected.name}`}
          </h1>
          <div>
            <ButtonLink
              onClick={() => setStudentSelected(null)}
              color={colors.buttonPageHeaderPrimary}
              to={studentSelected ? "/students/list" : "/students/new"}
            >
              {studentSelected ? (
                <MdKeyboardBackspace size={24} color="#fff" />
              ) : (
                <MdAdd size={24} color="#fff" />
              )}

              {studentSelected ? "VOLTAR" : "CADASTRAR"}
            </ButtonLink>
            <AsyncSelect
              placeholder="Buscar aluno"
              styles={CustomStyle}
              onChange={e => setStudentSelected(e)}
              noOptionsMessage={() => "Digite para procurar um estudante"}
              loadOptions={loadStudents}
              onInputChange={v => setStudentSearchName(v)}
            />
          </div>
        </Header>

        <Content>
          <Table>
            {!students.loading ? (
              <>
                <thead>
                  <tr>
                    <th>NOME</th>
                    <th>E-MAIL</th>
                    <th>IDADE</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {studentSelected
                    ? generator(studentSelected)
                    : students.list.map(student => generator(student))}
                </tbody>
              </>
            ) : (
              <Loading loading={students.loading} />
            )}
          </Table>

          {!students.loading ? (
            <ListController
              empty={students.list.length > 0}
              next={() => handleUpdateList(students.page + 1)}
              back={() => handleUpdateList(students.page - 1)}
              disableBack={students.page < 2}
              disableNext={students.page === totalPages}
              page={students.page}
            />
          ) : null}
        </Content>
      </BaseContent>
    </>
  );
}
