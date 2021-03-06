import { all, takeLatest, call, put } from "redux-saga/effects";

import { toast } from "react-toastify";
import api from "../../../services/api";
import history from "../../../services/history";

import { formatPrice } from "../../../util/format";

import {
  planFailure,
  planDeleteSuccess,
  planCreateSuccess,
  planUpdateSuccess,
  planSearchSuccess
} from "./actions";

export function* createPlans({ payload }) {
  try {
    const response = yield call(api.post, `/plans`, payload.data);

    toast.success(`Plano criado com sucesso`);
    history.push("/plans/list");
    yield put(planCreateSuccess(response.data));
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(planFailure());
  }
}

export function* deletePlans({ payload }) {
  try {
    yield call(api.delete, `/plans/${payload.data.id}`);

    yield put(planDeleteSuccess({ id: payload.data.id }));
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(planFailure());
  }
}

export function* searchPlans({ payload }) {
  try {
    const { page } = payload;

    const response = yield call(api.get, `/plans`, {
      params: {
        page
      }
    });

    const data = response.data.rows.map(item => {
      return {
        ...item,
        formattedPrice: formatPrice(item.price),
        formattedDuration:
          item.duration > 1 ? `${item.duration} meses` : `${item.duration} mês`
      };
    });

    yield put(
      planSearchSuccess({
        data,
        count: response.data.count,
        page
      })
    );
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(planFailure());
  }
}

export function* updatePlans({ payload }) {
  try {
    yield call(api.put, `/plans/${payload.data.id}`, payload.data);

    toast.success("Plano editado com sucesso");

    history.push("/plans/list");
    yield put(planUpdateSuccess());
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(planFailure());
  }
}

export default all([
  takeLatest("@plan/PLAN_DELETE_REQUEST", deletePlans),
  takeLatest("@plan/PLAN_CREATE_REQUEST", createPlans),
  takeLatest("@plan/PLAN_UPDATE_REQUEST", updatePlans),
  takeLatest("@plan/PLAN_SEARCH_REQUEST", searchPlans)
]);
