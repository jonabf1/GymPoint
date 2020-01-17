/* eslint-disable consistent-return */
import produce from "immer";

const INITIAL_STATE = {
  enrollments: {
    loading: false,
    list: [],
    page: 1,
    count: 0,
    countRequest: 0
  }
};

export default function enrollment(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@enrollment/ENROLLMENT_UPDATE_REQUEST": {
        draft.enrollments.loading = true;
        break;
      }
      case "@enrollment/ENROLLMENT_UPDATE_SUCCESS": {
        draft.enrollments.loading = false;
        break;
      }
      case "@enrollment/ENROLLMENT_CREATE_REQUEST": {
        draft.enrollments.loading = true;
        break;
      }
      case "@enrollment/ENROLLMENT_CREATE_SUCCESS": {
        state.enrollments.list.push(action.payload.data);
        draft.enrollments.loading = false;
        break;
      }
      case "@enrollment/ENROLLMENT_SEARCH_REQUEST": {
        draft.enrollments.loading = true;
        break;
      }
      case "@enrollment/ENROLLMENT_SEARCH_SUCCESS": {
        draft.enrollments.page = action.payload.page;

        draft.enrollments.count = action.payload.count;

        draft.enrollments.list = action.payload.data;
        draft.enrollments.loading = false;
        break;
      }
      case "@enrollment/ENROLLMENT_DELETE_REQUEST": {
        draft.enrollments.loading = true;
        break;
      }
      case "@enrollment/ENROLLMENT_DELETE_SUCCESS": {
        const filter = state.enrollments.list.filter(
          i => i.id !== action.payload.id
        );

        draft.enrollments.list = filter;
        draft.enrollments.loading = false;
        break;
      }
      case "@enrollment/ENROLLMENT_FAILURE": {
        draft.enrollments.loading = false;
        draft.enrollments.page = 1;
        break;
      }
      default:
        return state;
    }
  });
}
