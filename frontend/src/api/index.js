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
