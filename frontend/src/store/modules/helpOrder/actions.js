export function helpOrderCreateRequest(data) {
  return {
    type: "@helpOrder/HELPORDER_CREATE_REQUEST",
    payload: { data }
  };
}

export function helpOrderCreateSuccess(data) {
  return {
    type: "@helpOrder/HELPORDER_CREATE_SUCCESS",
    payload: { data }
  };
}

export function helpOrderSearchRequest(data) {
  return {
    type: "@helpOrder/HELPORDER_SEARCH_REQUEST",
    payload: data
  };
}

export function helpOrderSearchSuccess(data) {
  return {
    type: "@helpOrder/HELPORDER_SEARCH_SUCCESS",
    payload: data
  };
}

export function helpOrderFailure() {
  return {
    type: "@helpOrder/HELPORDER_FAILURE"
  };
}
