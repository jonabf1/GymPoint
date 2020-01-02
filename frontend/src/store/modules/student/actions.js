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

export function studentDeleteRequest(id) {
  return {
    type: "@student/STUDENT_DELETE_REQUEST",
    payload: { id }
  };
}

export function studentDeleteSuccess(id) {
  return {
    type: "@student/STUDENT_DELETE_SUCCESS",
    payload: { id }
  };
}

export function studentsFailure() {
  return {
    type: "@student/STUDENT_FAILURE"
  };
}
