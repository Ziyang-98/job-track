import dayjs from "dayjs";
import { LOCAL_STORAGE_SORTING_OPTION, LOCAL_STORAGE_USER_ID } from "./config";
import { DEFAULT_CONTACT } from "./constants";

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

export const getSortingOptionFromLocalStorage = () => {
  return localStorage.getItem(LOCAL_STORAGE_SORTING_OPTION);
};

export const storeSortingOptionFromLocalStorage = (sortingOption) => {
  localStorage.setItem(LOCAL_STORAGE_SORTING_OPTION, sortingOption);
};

const isContactEqual = (contact1, contact2) => {
  return (
    contact1.name === contact2.name &&
    contact1.email === contact2.email &&
    contact1.role === contact2.role &&
    contact1.met === contact2.met
  );
};

const filterDefaultContacts = (contacts) => {
  return contacts.filter((c) => !isContactEqual(c, DEFAULT_CONTACT));
};

export const formatContacts = (contacts) => {
  let newContacts = [...contacts];
  newContacts = newContacts.map((c) => ({
    name: c.name.trim(),
    email: c.email.trim(),
    role: c.role.trim(),
    met: c.met.trim(),
  }));

  newContacts = filterDefaultContacts(newContacts);
  return newContacts;
};

export const formatRawJobAppData = (rawJobApps) => {
  const newJobApps = [[], [], [], [], []];

  rawJobApps.forEach((rawJobApp) => {
    newJobApps[parseInt(rawJobApp.status)].push({ ...rawJobApp });
  });
  return newJobApps;
};

export const sortJobApps = (jobApps, sortingFn) => {
  return jobApps.map((jobAppList) => jobAppList.sort(sortingFn));
};

export const isValidDate = (dateString) => {
  const dateParts = dateString.split("/");
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const year = parseInt(dateParts[2]);
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  const daysInMonth = new Date(year, month - 1, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return false;
  }

  return true;
};

export const toDate = (dateString) => {
  const dateParts = dateString.split("/");
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const year = parseInt(dateParts[2]);
  return new Date(year, month - 1, day);
};

export const convertDDMMYYYYToDdMmmYYYYformat = (dateString) => {
  const dateParts = dateString.split("/");
  const day = parseInt(dateParts[0]);
  const monthNumber = parseInt(dateParts[1]);
  const year = dateParts[2];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = months[monthNumber - 1];

  return `${day} ${monthName} ${year}`;
};
