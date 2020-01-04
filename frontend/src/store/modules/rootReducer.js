import { combineReducers } from "redux";
import auth from "./auth/reducer";
import student from "./student/reducer";
import plan from "./plan/reducer";
import general from "./general/reducer";

export default combineReducers({
  general
});
