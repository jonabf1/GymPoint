import { all, takeLatest, call, put } from "redux-saga/effects";

import { toast } from "react-toastify";
import history from "../../../services/history";
import api from "../../../services/api";

import {
  planFailure,
  planDeleteSuccess,
  planCreateSuccess,
  planUpdateSuccess,
  planSearchSuccess
} from "./actions";

export function* createPlans({ payload }) {
  try {
    const response = yield call(api.post, "/plans", payload.data);

    if (response.status === 200) {
      toast.success("Plano criado com sucesso");
    }

    yield put(planCreateSuccess(response.data));

  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(planFailure());
  }
}

export function* deletePlans({ payload }) {
  try {
    yield call(api.delete, `/plans/${payload.id}`);

    yield put(planDeleteSuccess(payload.id));
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(planFailure());
  }
}

export function* searchPlans({ payload }) {
  try {
    const { page } = payload;

    if (page <= 0) {
      return;
    }

    const response = yield call(api.get, "/plans", {
      params: {
        page
      }
    });

    const futureResponse = yield call(api.get, "/plans", {
      params: {
        page: page + 1
      }
    });

    if (response.data.length <= 0) {
      yield put(planFailure());
      return;
    }

    let limit = false;
    if (futureResponse.data.length === 0) {
      limit = true;
    }
    if (response.data.length < 10) {
      limit = true;
      yield put(planSearchSuccess({ data: response.data, page, limit }));
    }

    yield put(planSearchSuccess({ data: response.data, page, limit }));
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(planFailure());
  }
}

export function* updatePlans({ payload }) {
  try {
    const response = yield call(
      api.put,
      `/plans/${payload.data.id}`,
      payload.data
    );

    if (response.status === 200) {
      toast.success("Plano editado com sucesso");
    }

    yield put(planUpdateSuccess());
    history.push("/plans/list");
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
  }
}

export default all([
  takeLatest("@plan/PLAN_DELETE_REQUEST", deletePlans),
  takeLatest("@plan/PLAN_CREATE_REQUEST", createPlans),
  takeLatest("@plan/PLAN_UPDATE_REQUEST", updatePlans),
  takeLatest("@plan/PLAN_SEARCH_REQUEST", searchPlans)
]);
