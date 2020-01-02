import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Async, { makeAsyncSelect } from "react-select/async";
import Select from "react-select";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  studentSearchRequest,
  studentDeleteRequest
} from "../../../store/modules/student/actions";

import Header from "../../../components/base/header";
import BaseContent from "../../../components/base/baseContent";
import Content from "../../../components/content";
import CustomButton from "../../../components/buttons/customButton";
import ButtonLink from "../../../components/buttons/buttonLink";
import Table from "../../../components/table";

import colors from "../../../styles/colors";
import { Container, ManageList } from "./styles";
import Loading from "../../../components/loading";

export default function List() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.student.students);

  useEffect(() => {
    dispatch(studentSearchRequest({ name: "", page: students.page }));
  }, [dispatch, students.page]);

  function handleDelete(id) {
    dispatch(studentDeleteRequest(id));
  }

  function handleUpdateList(page) {
    dispatch(studentSearchRequest({ name: "", page }));
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
              <Select
                options="students"
                value="studentSelected"
                onChange={e => "setStudentSelected"("e")}
                asyncFunc="loadStudents"
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
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.age}</td>
                      <td>
                        <ButtonLink
                          to={`/students/edit/${student.id}`}
                          color={colors.editTable}
                        >
                          editar
                        </ButtonLink>
                        <ButtonLink
                          onClick={() => handleDelete(student.id)}
                          color={colors.deleteTable}
                        >
                          apagar
                        </ButtonLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <Loading loading={students.loading} />
            )}
          </Table>
          {!students.loading ? (
            <ManageList>
              <CustomButton bool={students.page < 2} width="auto" height="auto">
                <FaChevronLeft
                  onClick={() => handleUpdateList(students.page - 1)}
                  color={
                    students.page < 2
                      ? colors.buttonPageHeaderSecondary
                      : colors.buttonPageHeaderPrimary
                  }
                  size={24}
                />
              </CustomButton>
              <p>{students.page}</p>
              <CustomButton bool={students.limit} width="auto" height="auto">
                <FaChevronRight
                  onClick={() => handleUpdateList(students.page + 1)}
                  color={
                    students.limit
                      ? colors.buttonPageHeaderSecondary
                      : colors.buttonPageHeaderPrimary
                  }
                  size={24}
                />
              </CustomButton>
            </ManageList>
          ) : null}
        </Content>
      </BaseContent>
    </>
  );
}
