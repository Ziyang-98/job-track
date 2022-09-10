import axios from "axios";
import { USER_ENDPOINT, JOB_APP_ENDPOINT } from "common/config";

export async function getUser(userId) {
  const response = await new axios.post(`${USER_ENDPOINT}&userId=${userId}`);
  return response;
}

export async function getJobApps(userId) {
  const response = await new axios.post(`${JOB_APP_ENDPOINT}&userId=${userId}`);
  return response;
}
