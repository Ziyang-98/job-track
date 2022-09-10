import axios from "axios";
import { USER_ENDPOINT, JOB_APP_ENDPOINT } from "common/config";

export async function getUser(userId) {
  let response = null;
  if (!userId) {
    response = await new axios.get(USER_ENDPOINT);
  } else {
    response = await new axios.get(`${USER_ENDPOINT}?userId=${userId}`);
  }
  return response;
}

export async function getJobApps(userId) {
  const response = await new axios.get(
    `${JOB_APP_ENDPOINT}?userId=${userId ?? ""}`
  );
  return response;
}

export async function createJobApp(userId, jobAppBody) {
  const body = { userId, jobApp: jobAppBody };
  const response = await new axios.post(JOB_APP_ENDPOINT, body);
  return response;
}

export async function updateJobApp(userId, jobAppBody) {
  const body = { userId, jobApp: jobAppBody };
  const response = await new axios.put(JOB_APP_ENDPOINT, body);
  return response;
}
