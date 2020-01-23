import { all } from "redux-saga/effects";
import auth from "./auth/sagas";
import enrollment from "./enrollment/sagas";
import plan from "./plan/sagas";
import student from "./student/sagas";
import helpOrder from "./helpOrder/sagas";

export default function* rootSaga() {
  return yield all([helpOrder, student, plan, enrollment, auth]);
}
