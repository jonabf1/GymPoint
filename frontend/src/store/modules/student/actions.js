export function studentUpdateRequest(data) {
  return {
    type: "@student/STUDENT_UPDATE_REQUEST",
    payload: { data }
  };
}

export function studentUpdateSuccess(data) {
  return {
    type: "@student/STUDENT_UPDATE_SUCCESS",
    payload: { data }
  };
}

export function studentCreateRequest(data) {
  return {
    type: "@student/STUDENT_CREATE_REQUEST",
    payload: { data }
  };
}

export function studentCreateSuccess(data) {
  return {
    type: "@student/STUDENT_CREATE_SUCCESS",
    payload: { data }
  };
}

export function studentDeleteRequest(data) {
  return {
    type: "@student/STUDENT_DELETE_REQUEST",
    payload: { data }
  };
}

export function studentDeleteSuccess(data) {
  return {
    type: "@student/STUDENT_DELETE_SUCCESS",
    payload: { data }
  };
}
export function studentSearchRequest(data) {
  return {
    type: "@student/STUDENT_SEARCH_REQUEST",
    payload: data
  };
}

export function studentSearchSuccess(data) {
  return {
    type: "@student/STUDENT_SEARCH_SUCCESS",
    payload: data
  };
}

export function studentFailure() {
  return {
    type: "@student/STUDENT_FAILURE"
  };
}
