import { findDoc, findUser, removeDoc, replaceDoc } from "./utils.js";
import JobApplicationModel from "../models/job-application.js";

export async function getJobApplicationsForUser(userParams) {
  const user = await findUser(userParams);
  await user.populate("jobApplications");
  return user.jobApplications;
}

export async function addJobApplicationForUser(userParams, newJobAppParams) {
  const user = await findUser(userParams);
  const currentDatetime = new Date().toISOString();
  const newJobApp = new JobApplicationModel({
    userId: user._id,
    ...newJobAppParams,
    datetimeLastUpdated: currentDatetime,
    datetimeCreated: currentDatetime,
  });
  await newJobApp.save();
  user.jobApplications.push(newJobApp);
  await user.save();
  return newJobApp;
}

export async function updateJobApplicationForUser(userParams, newJobAppParams) {
  const user = await findUser(userParams);
  user.jobApplications = replaceDoc(user.jobApplications, newJobAppParams);
  await user.save();
}

export async function deleteJobApplicationForUser(userParams, jobAppParams) {
  const user = await findUser(userParams);
  user.jobApplications = removeDoc(user.jobApplications, jobAppParams);
  await user.save();
}

export async function addContactForJobApp(
  userParams,
  jobAppParams,
  newContactParams
) {
  const user = await findUser(userParams);
  const jobApp = findDoc(user.jobApplications, jobAppParams);
  const newContact = jobApp.contacts.create(newContactParams);
  jobApp.contacts.push(newContact);
  await user.save();
  return newContact;
}

export async function updateContactForJobApp(
  userParams,
  jobAppParams,
  newContactParams
) {
  const user = await findUser(userParams);
  const jobApp = findDoc(user.jobApplications, jobAppParams);
  jobApp.contacts = replaceDoc(jobApp.contacts, newContactParams);
  await user.save();
}

export async function deleteContactForJobApp(
  userParams,
  jobAppParams,
  contactParams
) {
  const user = await findUser(userParams);
  const jobApp = findDoc(user.jobApplications, jobAppParams);

  jobApp.contacts = removeDoc(jobApp.contacts, contactParams);
  await user.save();
}
