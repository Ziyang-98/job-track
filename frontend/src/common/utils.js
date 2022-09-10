import dayjs from "dayjs";
import { LOCAL_STORAGE_USER_ID } from "./config";

export const convertStringToDayjs = (string) => {
  if (string === null) {
    return null;
  }

  return dayjs(string, "DD/MM/YYYY");
};

export const getUserIdFromLocalStorage = () => {
  return localStorage.getItem(LOCAL_STORAGE_USER_ID);
};

export const storeUserIdFromLocalStorage = (userId) => {
  localStorage.setItem(LOCAL_STORAGE_USER_ID, userId);
};

export const formatRawJobAppData = (rawJobApps) => {
  const newJobApps = [[], [], [], [], []];

  rawJobApps.forEach((rawJobApp) => {
    newJobApps[rawJobApp.status].push({ ...rawJobApp });
  });
  console.log(newJobApps);
  return newJobApps;
};
