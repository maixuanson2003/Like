import request from "utils/request";

// ======================== Fields =================================

export const createField = (params) => {
  return request("/api/field", {
    method: "post",
    params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const creatUser = (params) => {
  return request("api/admin/user", {
    method: "post",
    params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const createProject = (params) => {
  return request("api/batch-project", {
    method: "post",
    params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const deleteUser = (id) => {
  return request(`api/admin/user/${id}`, {
    method: "delete",
  });
};
export const updateUser = (id, params) => {
  return request(`/api/admin/user/${id}`, {
    method: "PUT",
    params,
  });
};

export const updateBatchProject = (id, params) => {
  return request(`/api/batch-project/${id}`, {
    method: "PUT",
    params,
  });
};
export const getProjectById = (id) => {
  return request(`/api/batch-project/${id}`, {});
};
export const deleteProjectById = (id) => {
  return request(`/api/batch-project/${id}`, {
    method: "delete",
  });
};
export const getFieldById = (id) => {
  return request(`/api/field/${id}`, {});
};

export const updateField = (id, params) => {
  return request(`/api/field/${id}`, {
    method: "PUT",
    params,
  });
};

export const deleteFieldById = (id) => {
  return request(`/api/field/${id}`, {
    method: "delete",
  });
};

// ======================== Course =================================

export const createCourse = (params) => {
  return request("/api/course", {
    method: "post",
    params,
  });
};
export const createTopicOfYear = (body, queryParams) => {
  return request("/api/topics-of-year", {
    method: "post",
    params: queryParams,
    data: body,
  });
};
export const deleteTopicOfYear = (queryParams) => {
  return request("/api/topics-of-year", {
    method: "delete",
    params: queryParams,
  });
};

export const getCourseById = (id) => {
  return request(`/api/course/${id}`, {});
};

export const updateCourse = (id, params) => {
  return request(`/api/course/${id}`, {
    method: "PUT",
    params,
  });
};

export const deleteCourseById = (id) => {
  return request(`/api/course/${id}`, {
    method: "delete",
  });
};

// ======================== class =================================

export const createClass = (params) => {
  return request("/api/class", {
    method: "post",
    params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getClassById = (id) => {
  return request(`/api/class/${id}`, {});
};

export const updateClass = (id, params) => {
  return request(`/api/class/${id}`, {
    method: "PUT",
    params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteClassById = (id) => {
  return request(`/api/class/${id}`, {
    method: "delete",
  });
};
