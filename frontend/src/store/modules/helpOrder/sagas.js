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

    yield put(
      helpOrderSearchSuccess({
        data: response.data.rows
      })
    );
  } catch (err) {
    yield put(helpOrderFailure());
    toast.error("Ocorreu um erro na requisição");
  }
}

export default all([
  takeLatest("@helpOrder/helpOrder_CREATE_REQUEST", createHelpOrder),
  takeLatest("@helpOrder/helpOrder_SEARCH_REQUEST", searchHelpOrder)
]);
