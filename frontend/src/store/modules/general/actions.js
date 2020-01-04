export function generalUpdateRequest(data) {
  return {
    type: "@general/GENERAL_UPDATE_REQUEST",
    payload: { data }
  };
}

export function generalUpdateSuccess(data) {
  return {
    type: "@general/GENERAL_UPDATE_SUCCESS",
    payload: { data }
  };
}

export function generalCreateRequest(data) {
  return {
    type: "@general/GENERAL_CREATE_REQUEST",
    payload: { data }
  };
}

export function generalCreateSuccess(data) {
  return {
    type: "@general/GENERAL_CREATE_SUCCESS",
    payload: { data }
  };
}

export function generalDeleteRequest(id) {
  return {
    type: "@general/GENERAL_DELETE_REQUEST",
    payload: { id }
  };
}

export function generalDeleteSuccess(id) {
  return {
    type: "@general/GENERAL_DELETE_SUCCESS",
    payload: { id }
  };
}
export function generalSearchRequest(data) {
  return {
    type: "@general/GENERAL_SEARCH_REQUEST",
    payload: data
  };
}

export function generalSearchSuccess(data) {
  return {
    type: "@general/GENERAL_SEARCH_SUCCESS",
    payload: data
  };
}

export function generalFailure() {
  return {
    type: "@general/GENERAL_FAILURE"
  };
}
