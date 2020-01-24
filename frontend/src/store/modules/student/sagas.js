import { all, takeLatest, call, put } from "redux-saga/effects";

import { toast } from "react-toastify";
import history from "../../../services/history";
import api from "../../../services/api";

import {
  studentFailure,
  studentDeleteSuccess,
  studentCreateSuccess,
  studentUpdateSuccess,
  studentSearchSuccess
} from "./actions";

export function* createStudents({ payload }) {
  try {
    const response = yield call(api.post, `/students`, payload.data);

    toast.success(`Estudante criado com sucesso`);

    history.push("/students/list");
    yield put(studentCreateSuccess(response.data));
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(studentFailure());
  }
}

export function* deleteStudents({ payload }) {
  try {
    console.log(payload);
    yield call(api.delete, `/students/${payload.data.id}`);

    yield put(studentDeleteSuccess({ id: payload.data.id }));
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(studentFailure());
  }
}

export function* searchStudents({ payload }) {
  try {
    const { name, page } = payload;

    const response = yield call(api.get, `/students`, {
      params: {
        name: name || null,
        page
      }
    });

    yield put(
      studentSearchSuccess({
        data: response.data.rows,
        count: response.data.count,
        page
      })
    );
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(studentFailure());
  }
}

export function* updateStudents({ payload }) {
  try {
    yield call(api.put, `/students/${payload.data.id}`, payload.data);

    toast.success("Estudante editado com sucesso");

    history.push("/students/list");
    yield put(studentUpdateSuccess());
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(studentFailure());
  }
}

export default all([
  takeLatest("@student/STUDENT_DELETE_REQUEST", deleteStudents),
  takeLatest("@student/STUDENT_CREATE_REQUEST", createStudents),
  takeLatest("@student/STUDENT_UPDATE_REQUEST", updateStudents),
  takeLatest("@student/STUDENT_SEARCH_REQUEST", searchStudents)
]);
