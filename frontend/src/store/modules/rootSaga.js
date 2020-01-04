import { all } from "redux-saga/effects";
import auth from "./auth/sagas";
import student from "./student/sagas";
import plan from "./plan/sagas";
import general from "./general/sagas";

export default function* rootSaga() {
  return yield all([general]);
}
