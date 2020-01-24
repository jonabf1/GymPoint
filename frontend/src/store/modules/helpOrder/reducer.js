/* eslint-disable consistent-return */
import produce from "immer";

const INITIAL_STATE = {
  helpOrders: {
    loading: false,
    list: [],
    page: 1,
    count: 0,
    countRequest: 0
  }
};

export default function helpOrder(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@helpOrder/HELPORDER_CREATE_REQUEST": {
        draft.helpOrders.loading = true;
        break;
      }
      case "@helpOrder/HELPORDER_CREATE_SUCCESS": {
        draft.helpOrders.loading = false;
        break;
      }
      case "@helpOrder/HELPORDER_SEARCH_REQUEST": {
        draft.helpOrders.loading = true;
        break;
      }
      case "@helpOrder/HELPORDER_SEARCH_SUCCESS": {
        draft.helpOrders.page = action.payload.page;

        draft.helpOrders.count = action.payload.count;

        draft.helpOrders.list = action.payload.data;
        draft.helpOrders.loading = false;
        break;
      }
      case "@helpOrder/HELPORDER_FAILURE": {
        draft.helpOrders.loading = false;
        draft.helpOrders.page = 1;
        break;
      }
      default:
        return state;
    }
  });
}
