import { all, takeLatest, call, put } from "redux-saga/effects";

import { toast } from "react-toastify";
import history from "../../../services/history";
import api from "../../../services/api";

import {
  studentSearchSuccess,
  studentsFailure,
  studentDeleteSuccess,
  studentCreateSuccess,
  studentUpdateSuccess
} from "./actions";

export function* createStudents({ payload }) {
  try {
    const response = yield call(api.post, "/students", payload.data);

    if (response) {
      toast.success("Estudante criado com sucesso");
    }

    yield put(studentCreateSuccess(response.data));

    history.push("/students/list");
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(studentsFailure());
  }
}

export function* searchStudents({ payload }) {
  try {
    const { name, page } = payload;

    if (page <= 0) {
      return;
    }

    const response = yield call(api.get, "/students", {
      params: {
        name: name || "",
        page
      }
    });

    const futureResponse = yield call(api.get, "/students", {
      params: {
        name: name || "",
        page: page + 1
      }
    });

    if (response.data.length <= 0) {
      yield put(studentsFailure());
      return;
    }

    // desabilitar botoes de navegacao
    let limit = false;
    if (futureResponse.data.length === 0) {
      limit = true;
    }
    if (response.data.length < 10) {
      limit = true;
      yield put(studentSearchSuccess({ data: response.data, page, limit }));
    }

    yield put(studentSearchSuccess({ data: response.data, page, limit }));
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(studentsFailure());
  }
}

export function* deleteStudents({ payload }) {
  try {
    yield call(api.delete, `/students/${payload.id}`);

    yield put(studentDeleteSuccess(payload.id));
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(studentsFailure());
  }
}

export function* updateStudents({ payload }) {
  try {
    const response = yield call(
      api.put,
      `/students/${payload.data.id}`,
      payload.data
    );

    if (response.status === 200) {
      toast.success("Usuário editado com sucesso");
    }

    yield put(studentUpdateSuccess());
    history.push("/students/list");
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
  }
}

export default all([
  takeLatest("@student/STUDENT_SEARCH_REQUEST", searchStudents),
  takeLatest("@student/STUDENT_DELETE_REQUEST", deleteStudents),
  takeLatest("@student/STUDENT_CREATE_REQUEST", createStudents),
  takeLatest("@student/STUDENT_UPDATE_REQUEST", updateStudents)
]);
