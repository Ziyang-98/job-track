const BACKEND_SERVER =
  process.env.REACT_APP_ENV === "DEV"
    ? process.env.REACT_APP_DEV_SERVER
    : process.env.REACT_APP_PROD_SERVER;

export const USER_ENDPOINT = BACKEND_SERVER + "/user";

export const JOB_APP_ENDPOINT = USER_ENDPOINT + "/job-apps";

export const LOCAL_STORAGE_USER_ID = "job-track-user-id";
