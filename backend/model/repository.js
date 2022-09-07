import UserModel from "./user-model.js";
import "dotenv/config";

//Set up mongoose connection
import mongoose from "mongoose";

let mongoDB =
  process.env.ENV == "PROD"
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

function replaceDoc(docArray, newParams) {
  for (let i = 0; i < docArray.length; i++) {
    if (docArray[i]._id.toString() === newParams._id) {
      docArray[i] = newParams;
      break;
    }
  }
  return docArray;
}

function removeDoc(docArray, params) {
  return docArray.filter((item) => !(item._id.toString() === params._id));
}

function findDoc(docArray, params) {
  return docArray.find((item) => item._id.toString() === params._id);
}

export async function createUser(params) {
  const newUser = new UserModel(params);
  await newUser.save();
  return newUser;
}

export async function getUser(params) {
  return await UserModel.findOne(params);
}

export async function getJobApplicationsForUser(userParams) {
  const user = await UserModel.findOne(userParams);
  return user?.jobApplications;
}

export async function addJobApplicationForUser(userParams, newJobAppParams) {
  const user = await UserModel.findOne(userParams);
  user.jobApplications.push(newJobAppParams);
  await user.save();
}

export async function updateJobApplicationForUser(userParams, newJobAppParams) {
  const user = await UserModel.findOne(userParams);
  user.jobApplications = replaceDoc(user.jobApplications, newJobAppParams);
  console.log(user.jobApplications);
  await user.save();
}

export async function deleteJobApplicationForUser(userParams, jobAppParams) {
  const user = await UserModel.findOne(userParams);
  user.jobApplications = removeDoc(user.jobApplications, jobAppParams);
  await user.save();
}

export async function addContactForJobApp(
  userParams,
  jobAppParams,
  newContactParams
) {
  const user = await UserModel.findOne(userParams);
  const jobApp = findDoc(user.jobApplications, jobAppParams);
  if (!jobApp) {
    throw new Error("Invalid job id provided, unable to find job application");
  }
  jobApp.contacts.push(newContactParams);

  await user.save();
}

export async function updateContactForJobApp(
  userParams,
  jobAppParams,
  newContactParams
) {
  const user = await UserModel.findOne(userParams);
  const jobApp = findDoc(user.jobApplications, jobAppParams);
  if (!jobApp) {
    throw new Error("Invalid job id provided, unable to find job application");
  }
  jobApp.contacts = replaceDoc(jobApp.contacts, newContactParams);
  await user.save();
}

export async function deleteContactForJobApp(
  userParams,
  jobAppParams,
  contactParams
) {
  const user = await UserModel.findOne(userParams);
  const jobApp = findDoc(user.jobApplications, jobAppParams);
  if (!jobApp) {
    throw new Error("Invalid job id provided, unable to find job application");
  }
  jobApp.contacts = removeDoc(jobApp.contacts, contactParams);
  await user.save();
}
