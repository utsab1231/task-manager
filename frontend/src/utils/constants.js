const API_URL = "https://task-manager-backend-2jvl.onrender.com/api/v1";

export const REGISTER_URL = `${API_URL}/user/signup`;
export const LOGIN_URL = `${API_URL}/user/login`;
export const ADD_TASK = `${API_URL}/task/createtask`;
export const GET_TASK = `${API_URL}/task/gettask`;
export const DELETE_TASK = `${API_URL}/task/deletetask`;
export const UPDATE_TASK = `${API_URL}/task/updatetask`;
export const MARK_TASK = `${API_URL}/task/marktask`;
export const PRIORITY_CHART = {
  1: "Low",
  2: "Medium",
  3: "Moderate",
  4: "High",
  5: "Critical",
};
