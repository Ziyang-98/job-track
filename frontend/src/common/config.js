const BACKEND_SERVER =
  process.env.ENV === "DEV" ? process.env.DEV_SERVER : process.env.PROD_SERVER;

export const USER_ENDPOINT = BACKEND_SERVER + "/user";

export const JOB_APP_ENDPOINT = USER_ENDPOINT + "/job-apps";
