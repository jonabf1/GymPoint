export function planUpdateRequest(data) {
  return {
    type: "@plan/PLAN_UPDATE_REQUEST",
    payload: { data }
  };
}

export function planUpdateSuccess(data) {
  return {
    type: "@plan/PLAN_UPDATE_SUCCESS",
    payload: { data }
  };
}

export function planCreateRequest(data) {
  return {
    type: "@plan/PLAN_CREATE_REQUEST",
    payload: { data }
  };
}

export function planCreateSuccess(data) {
  return {
    type: "@plan/PLAN_CREATE_SUCCESS",
    payload: { data }
  };
}

export function planDeleteRequest(id) {
  return {
    type: "@plan/PLAN_DELETE_REQUEST",
    payload: { id }
  };
}

export function planDeleteSuccess(id) {
  return {
    type: "@plan/PLAN_DELETE_SUCCESS",
    payload: { id }
  };
}
export function planSearchRequest(data) {
  return {
    type: "@plan/PLAN_SEARCH_REQUEST",
    payload: data
  };
}

export function planSearchSuccess(data) {
  return {
    type: "@plan/PLAN_SEARCH_SUCCESS",
    payload: data
  };
}

export function planFailure() {
  return {
    type: "@plan/PLAN_FAILURE"
  };
}
