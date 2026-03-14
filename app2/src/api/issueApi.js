import axiosInstance from "./axios";

// CREATE issue
export const createIssue = (formData) => {
  return axiosInstance.post("/issues", formData);
};

// GET all issues
export const getIssues = () => {
  return axiosInstance.get("/issues");
};

// GET issue by ID
export const getIssueById = (id) => {
  return axiosInstance.get(`/issues/${id}`);
};

// UPDATE issue status
export const updateIssueStatus = (id, status) => {
  return axiosInstance.patch(`/issues/${id}`, { status });
};

export const getResolvedIssues = () => {
  return axiosInstance.get("/issues?status=RESOLVED");
};

export const getInProgressIssues = () => {
  return axiosInstance.get("/issues?status=IN_PROGRESS");
};

// UPDATE full issue (solver + status)
export const updateIssue = (id, data) => {
  return axiosInstance.patch(`/issues/${id}`, data)
};


export const registerUser = (data) => {
  return axiosInstance.post("/auth/register", data);
};

export const loginUser = (data) => {
  return axiosInstance.post("/auth/login", data);
};

export const sendContactMessage = async (data) => {
  const res = await axiosInstance.post("/contact", data);
  return res.data;
};

export const deleteIssue = (id) => {
  return axiosInstance.delete(`/issues/${id}`);
};