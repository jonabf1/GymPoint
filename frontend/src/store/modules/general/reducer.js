import produce from "immer";

const INITIAL_STATE = {
  generals: {
    loading: false,
    list: [],
    page: 1,
    limit: false
  }
};

export default function general(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@general/GENERAL_UPDATE_REQUEST": {
        draft.generals.loading = true;
        break;
      }
      case "@general/GENERAL_UPDATE_SUCCESS": {
        draft.generals.loading = false;
        break;
      }
      case "@general/GENERAL_CREATE_REQUEST": {
        draft.generals.loading = true;
        break;
      }
      case "@general/GENERAL_CREATE_SUCCESS": {
        state.generals.list.push(action.payload.data);
        draft.generals.loading = false;
        break;
      }
      case "@general/GENERAL_SEARCH_REQUEST": {
        draft.generals.loading = true;
        break;
      }
      case "@general/GENERAL_SEARCH_SUCCESS": {
        draft.generals.page = action.payload.page;
        draft.generals.limit = action.payload.limit;
        draft.generals.list = action.payload.data;
        draft.generals.loading = false;
        break;
      }
      case "@general/GENERAL_DELETE_REQUEST": {
        draft.generals.loading = true;
        break;
      }
      case "@general/GENERAL_DELETE_SUCCESS": {
        const filter = state.generals.list.filter(
          i => i.id !== action.payload.id
        );

        draft.generals.list = filter;
        draft.generals.loading = false;
        break;
      }
      case "@general/GENERAL_FAILURE": {
        draft.generals.loading = false;
        draft.generals.page = 1;
        break;
      }
      default:
        return state;
    }
  });
}
