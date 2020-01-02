import produce from "immer";

const INITIAL_STATE = {
  students: {
    loading: false,
    list: [],
    page: 1,
    limit: false
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
        state.students.list.push(action.payload.data);
        draft.students.loading = false;
        break;
      }
      case "@student/STUDENT_SEARCH_REQUEST": {
        draft.students.loading = true;
        break;
      }
      case "@student/STUDENT_SEARCH_SUCCESS": {
        draft.students.page = action.payload.page;
        draft.students.limit = action.payload.limit;
        draft.students.list = action.payload.data;
        draft.students.loading = false;
        break;
      }
      case "@student/STUDENT_DELETE_REQUEST": {
        draft.students.loading = true;
        break;
      }
      case "@student/STUDENT_DELETE_SUCCESS": {
        const filter = state.students.list.filter(
          i => i.id !== action.payload.id
        );

        draft.students.list = filter;
        draft.students.loading = false;
        break;
      }
      case "@student/STUDENT_FAILURE": {
        draft.students.loading = false;
        break;
      }
      default:
        return state;
    }
  });
}
