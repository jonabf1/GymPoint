import { all, takeLatest, call, put } from "redux-saga/effects";

import { toast } from "react-toastify";
import history from "../../../services/history";
import api from "../../../services/api";

import {
  studentSearchSuccess,
  studentsFailure,
  studentDeleteSuccess,
  studentCreateSuccess
} from "./actions";

export function* createStudents({ payload }) {
  try {
    const response = yield call(api.post, "/students", payload.data);

    yield put(studentCreateSuccess(response.data));

    if (response) {
      toast.success("Estudante criado com sucesso");
    }
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

    const newResponse = yield call(api.get, "/students", {
      params: {
        name: name || "",
        page: page + 1
      }
    });

    if (response.data.length <= 0) {
      yield put(studentsFailure());
      return;
    }

    let limit = false;
    if (newResponse.data.length < 10) {
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

export default all([
  takeLatest("@student/STUDENT_SEARCH_REQUEST", searchStudents),
  takeLatest("@student/STUDENT_DELETE_REQUEST", deleteStudents),
  takeLatest("@student/STUDENT_CREATE_REQUEST", createStudents)
]);
