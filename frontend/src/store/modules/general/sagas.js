import { all, takeLatest, call, put } from "redux-saga/effects";

import { toast } from "react-toastify";
import history from "../../../services/history";
import api from "../../../services/api";

import {
  generalFailure,
  generalDeleteSuccess,
  generalCreateSuccess,
  generalUpdateSuccess,
  generalSearchSuccess
} from "./actions";

export function* createGenerals({ payload }) {
  try {
    const response = yield call(api.post, `/${payload.path}`, payload.data);

    if (response.status === 200) {
      toast.success(`${payload.customMSG} criado com sucesso`);
    }

    yield put(generalCreateSuccess(response.data));
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(generalFailure());
  }
}

export function* deleteGenerals({ payload }) {
  try {
    yield call(api.delete, `/${payload.path}/${payload.id}`);

    yield put(generalDeleteSuccess(payload.id));
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(generalFailure());
  }
}

export function* searchGenerals({ payload }) {
  try {
    const { name, page } = payload;

    if (page <= 0) {
      return;
    }

    const response = yield call(api.get, `/${payload.path}`, {
      params: {
        name: name || "",
        page
      }
    });

    const futureResponse = yield call(api.get, `/${payload.path}`, {
      params: {
        name: name || "",
        page: page + 1
      }
    });

    if (response.data.length <= 0) {
      yield put(generalFailure());
      return;
    }

    let limit = false;
    if (futureResponse.data.length === 0) {
      limit = true;
    }
    if (response.data.length < 10) {
      limit = true;
      yield put(generalSearchSuccess({ data: response.data, page, limit }));
    }

    yield put(generalSearchSuccess({ data: response.data, page, limit }));
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
    yield put(generalFailure());
  }
}

export function* updateGenerals({ payload }) {
  try {
    const response = yield call(
      api.put,
      `/${payload.path}/${payload.data.id}`,
      payload.data
    );

    if (response.status === 200) {
      toast.success("generalo editado com sucesso");
    }

    yield put(generalUpdateSuccess());
  } catch (err) {
    toast.error("Ocorreu um erro na requisição");
  }
}

export default all([
  takeLatest("@general/GENERAL_DELETE_REQUEST", deleteGenerals),
  takeLatest("@general/GENERAL_CREATE_REQUEST", createGenerals),
  takeLatest("@general/GENERAL_UPDATE_REQUEST", updateGenerals),
  takeLatest("@general/GENERAL_SEARCH_REQUEST", searchGenerals)
]);
