import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import CustomButton from "../../../components/buttons/customButton";
import ButtonLink from "../../../components/buttons/ButtonLink";
import Table from "../../../components/table/structure";
import Loading from "../../../components/loading";
import ListController from "../../../components/ListController";
import AsyncSelect from "../../../components/selectAsync";
import TableGenerator from "../../../components/table/tableGenerator";

import colors from "../../../styles/colors";

export default function StudentList() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.student.students);
  const [studentSearchName, setStudentSearchName] = useState();
  const [studentSelected, setStudentSelected] = useState();

  useEffect(() => {
    if (students.page > 1 && students.list.length === 0) {
      dispatch(studentSearchRequest({ name: "", page: students.page - 1 }));
    }

    dispatch(studentSearchRequest({ name: "", page: students.page }));
  }, [dispatch, students.list.length, students.page]);

  function handleUpdateList(page) {
    dispatch(studentSearchRequest({ name: "", page }));
  }

  async function confirmDelete(data) {
    const func = await Modal(data);

    if (func) {
      dispatch(studentDeleteRequest(data.id));
    }
  }

  async function loadStudents() {
    const response = await api.get(`/students?name=${studentSearchName}`);
    return response.data;
  }

  function generator(data) {
    return (
      <TableGenerator
        key={data.id}
        data={data}
        onSearch={data}
        onRemove={() => confirmDelete()}
        path={`/students/edit/${data.id}`}
        onDelete={() =>
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
              onChange={e => setStudentSelected(e)}
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
              onAdd={() => handleUpdateList(students.page + 1)}
              onRemove={() => handleUpdateList(students.page - 1)}
              boolAdd={students.limit}
              boolRemove={students.page < 2}
              page={students.page}
            />
          ) : null}
        </Content>
      </BaseContent>
    </>
  );
}
