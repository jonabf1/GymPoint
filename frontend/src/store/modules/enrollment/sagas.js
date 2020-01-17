import { all, takeLatest, call, put } from "redux-saga/effects";

import { toast } from "react-toastify";
import api from "../../../services/api";
import formatDate from "../../../util/formatDate";

import {
  enrollmentFailure,
  enrollmentDeleteSuccess,
  enrollmentCreateSuccess,
  enrollmentUpdateSuccess,
  enrollmentSearchSuccess
} from "./actions";

export function* createEnrollments({ payload }) {
  try {
    const response = yield call(api.post, `/enrollments`, payload.data);

    toast.success(`Matricula criada com sucesso`);

    yield put(enrollmentCreateSuccess(response.data));
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(enrollmentFailure());
  }
}

export function* deleteEnrollments({ payload }) {
  try {
    yield call(api.delete, `/enrollments/${payload.data.id}`);

    yield put(enrollmentDeleteSuccess(payload.id));
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(enrollmentFailure());
  }
}

export function* searchEnrollments({ payload }) {
  try {
    const { page } = payload;

    const response = yield call(api.get, `/enrollments`, {
      params: {
        page
      }
    });

    const data = response.data.rows.map(item => {
      return {
        ...item,
        startDateFormatted: formatDate(item.start_date),
        endDateFormatted: formatDate(item.end_date),
        owner: item.student.name,
        ownerId: item.student.id,
        plan: item.plan.title,
        planId: item.plan.id
      };
    });

    yield put(
      enrollmentSearchSuccess({
        data,
        count: response.data.count,
        page
      })
    );
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(enrollmentFailure());
  }
}

export function* updateEnrollments({ payload }) {
  try {
    const response = yield call(
      api.put,
      `/enrollments/${payload.data.id}`,
      payload.data
    );

    if (response.status === 200) {
      toast.success("enrollmento editado com sucesso");
    }

    yield put(enrollmentUpdateSuccess());
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
  }
}

export default all([
  takeLatest("@enrollment/ENROLLMENT_DELETE_REQUEST", deleteEnrollments),
  takeLatest("@enrollment/ENROLLMENT_CREATE_REQUEST", createEnrollments),
  takeLatest("@enrollment/ENROLLMENT_UPDATE_REQUEST", updateEnrollments),
  takeLatest("@enrollment/ENROLLMENT_SEARCH_REQUEST", searchEnrollments)
]);
