import dayjs from "dayjs";
import { LOCAL_STORAGE_USER_ID } from "./config";
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

export const formatRawJobAppData = (rawJobApps) => {
  const newJobApps = [[], [], [], [], []];

  rawJobApps.forEach((rawJobApp) => {
    newJobApps[rawJobApp.status].push({ ...rawJobApp });
  });
  return newJobApps;
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
    email: c.name.trim(),
    role: c.name.trim(),
    met: c.met.trim(),
  }));

  newContacts = filterDefaultContacts(newContacts);
  return newContacts;
};
