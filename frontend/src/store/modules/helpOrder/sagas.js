import { all, takeLatest, call, put } from "redux-saga/effects";

import { toast } from "react-toastify";
import api from "../../../services/api";

import {
  helpOrderFailure,
  helpOrderCreateSuccess,
  helpOrderSearchSuccess
} from "./actions";

export function* createHelpOrder({ payload }) {
  try {
    const response = yield call(
      api.post,
      `/help-orders/${payload.data.id}/answers`,
      payload.data
    );

    yield put(helpOrderCreateSuccess(response.data));
  } catch (err) {
    yield put(helpOrderFailure());
    toast.error("Ocorreu um erro na requisição");
  }
}

export function* searchHelpOrder({ payload }) {
  try {
    const { page } = payload;

    const response = yield call(api.get, `/help-orders/answers`, {
      params: {
        page
      }
    });

    const newData = response.data.rows.map(item => {
      return {
        ...item,
        student: item.student.name,
        email: item.student.email
      };
    });

    yield put(
      helpOrderSearchSuccess({
        data: newData,
        count: response.data.count,
        page
      })
    );
  } catch (err) {
    yield put(helpOrderFailure());
    toast.error("Ocorreu um erro na requisição");
  }
}

export default all([
  takeLatest("@helpOrder/HELPORDER_CREATE_REQUEST", createHelpOrder),
  takeLatest("@helpOrder/HELPORDER_SEARCH_REQUEST", searchHelpOrder)
]);
