export function enrollmentUpdateRequest(data) {
  return {
    type: "@enrollment/ENROLLMENT_UPDATE_REQUEST",
    payload: { data }
  };
}

export function enrollmentUpdateSuccess(data) {
  return {
    type: "@enrollment/ENROLLMENT_UPDATE_SUCCESS",
    payload: { data }
  };
}

export function enrollmentCreateRequest(data) {
  return {
    type: "@enrollment/ENROLLMENT_CREATE_REQUEST",
    payload: { data }
  };
}

export function enrollmentCreateSuccess(data) {
  return {
    type: "@enrollment/ENROLLMENT_CREATE_SUCCESS",
    payload: { data }
  };
}

export function enrollmentDeleteRequest(data) {
  return {
    type: "@enrollment/ENROLLMENT_DELETE_REQUEST",
    payload: { data }
  };
}

export function enrollmentDeleteSuccess(data) {
  return {
    type: "@enrollment/ENROLLMENT_DELETE_SUCCESS",
    payload: { data }
  };
}
export function enrollmentSearchRequest(data) {
  return {
    type: "@enrollment/ENROLLMENT_SEARCH_REQUEST",
    payload: data
  };
}

export function enrollmentSearchSuccess(data) {
  return {
    type: "@enrollment/ENROLLMENT_SEARCH_SUCCESS",
    payload: data
  };
}

export function enrollmentFailure() {
  return {
    type: "@enrollment/ENROLLMENT_FAILURE"
  };
}
