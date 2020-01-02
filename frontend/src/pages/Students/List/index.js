import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Async from "react-select/async";

import api from "../../../services/api";
import Modal from "../../../components/modal";
import {
  studentSearchRequest,
  studentDeleteRequest
} from "../../../store/modules/student/actions";

import Header from "../../../components/base/header";
import BaseContent from "../../../components/base/baseContent";
import Content from "../../../components/content";
import CustomButton from "../../../components/buttons/customButton";
import Table from "../../../components/table/structure";
import Loading from "../../../components/loading";
import ListController from "../../../components/ListController";
import Item from "../../../components/table/item";

import colors from "../../../styles/colors";
import { Container } from "./styles";

export default function List() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.student.students);

  const [studentSearchName, setStudentSearchName] = useState();
  const [studentSelected, setStudentSelected] = useState();

  useEffect(() => {
    dispatch(studentSearchRequest({ name: "", page: students.page }));
  }, [dispatch, students.page]);

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
    const response = await api.get(`/students`, {
      query: {
        name: studentSearchName
      }
    });
    return response.data;
  }

  return (
    <>
      <BaseContent>
        <Header>
          <h1>Gerenciando alunos</h1>
          <div>
            <Link to="/students/new">
              <CustomButton
                color={colors.buttonPageHeaderPrimary}
                type="button"
              >
                CADASTRAR
              </CustomButton>
            </Link>
            <Container>
              <Async
                defaultValue={1}
                loadOptions={loadStudents}
                onInputChange={v => setStudentSearchName(v)}
                onChange={e => setStudentSelected(e)}
                getOptionLabel={option => option.name}
                placeholder="Buscar aluno"
              />
            </Container>
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
                  {students.list.map(student => (
                    <Item
                      key={student.id}
                      data={student}
                      onRemove={() => confirmDelete()}
                      path={`/students/edit/${student.id}`}
                      onDelete={() =>
                        confirmDelete({
                          id: student.id,
                          title: "Confirmar exclusão",
                          text: `Deseja deletar o estudante ${student.name}?`,
                          confirmText: "Deletar",
                          cancelText: "Cancelar",
                          icon: "warning",
                          finalText: "Deletado com sucesso!"
                        })
                      }
                      fields={["name", "email", "age"]}
                    />
                  ))}
                </tbody>
              </>
            ) : (
              <Loading loading={students.loading} />
            )}
          </Table>
          {!students.loading ? (
            <ListController
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
