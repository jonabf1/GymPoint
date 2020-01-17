import { combineReducers } from "redux";
import auth from "./auth/reducer";
import student from "./student/reducer";
import plan from "./plan/reducer";
import enrollment from "./enrollment/reducer";

export default combineReducers({
  student,
  enrollment,
  plan,
  auth
});
