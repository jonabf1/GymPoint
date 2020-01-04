import produce from "immer";

const INITIAL_STATE = {
  plans: {
    loading: false,
    list: [],
    page: 1,
    limit: false
  }
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@plan/PLAN_UPDATE_REQUEST": {
        draft.plans.loading = true;
        break;
      }
      case "@plan/PLAN_UPDATE_SUCCESS": {
        draft.plans.loading = false;
        break;
      }
      case "@plan/PLAN_CREATE_REQUEST": {
        draft.plans.loading = true;
        break;
      }
      case "@plan/PLAN_CREATE_SUCCESS": {
        state.plans.list.push(action.payload.data);
        draft.plans.loading = false;
        break;
      }
      case "@plan/PLAN_SEARCH_REQUEST": {
        draft.plans.loading = true;
        break;
      }
      case "@plan/PLAN_SEARCH_SUCCESS": {
        draft.plans.page = action.payload.page;
        draft.plans.limit = action.payload.limit;
        draft.plans.list = action.payload.data;
        draft.plans.loading = false;
        break;
      }
      case "@plan/PLAN_DELETE_REQUEST": {
        draft.plans.loading = true;
        break;
      }
      case "@plan/PLAN_DELETE_SUCCESS": {
        const filter = state.plans.list.filter(i => i.id !== action.payload.id);

        draft.plans.list = filter;
        draft.plans.loading = false;
        break;
      }
      case "@plan/PLAN_FAILURE": {
        draft.plans.loading = false;
        draft.plans.page = 1;
        break;
      }
      default:
        return state;
    }
  });
}
