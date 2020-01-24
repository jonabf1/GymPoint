/* eslint-disable consistent-return */
import produce from "immer";

const INITIAL_STATE = {
  students: {
    loading: false,
    list: [],
    page: 1,
    count: 0,
    countRequest: 0
  }
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@student/STUDENT_UPDATE_REQUEST": {
        draft.students.loading = true;
        break;
      }
      case "@student/STUDENT_UPDATE_SUCCESS": {
        draft.students.loading = false;
        break;
      }
      case "@student/STUDENT_CREATE_REQUEST": {
        draft.students.loading = true;
        break;
      }
      case "@student/STUDENT_CREATE_SUCCESS": {
        draft.students.loading = false;
        break;
      }
      case "@student/STUDENT_SEARCH_REQUEST": {
        draft.students.loading = true;
        break;
      }
      case "@student/STUDENT_SEARCH_SUCCESS": {
        draft.students.page = action.payload.page;

        draft.students.count = action.payload.count;

        draft.students.list = action.payload.data;
        draft.students.loading = false;
        break;
      }
      case "@student/STUDENT_DELETE_REQUEST": {
        draft.students.loading = true;
        break;
      }
      case "@student/STUDENT_DELETE_SUCCESS": {
        draft.students.list = state.students.list.filter(
          i => i.id !== action.payload.data.id
        );

        draft.students.loading = false;
        break;
      }
      case "@student/STUDENT_FAILURE": {
        draft.students.loading = false;
        draft.students.page = 1;
        break;
      }
      default:
        return state;
    }
  });
}
