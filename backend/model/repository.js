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

async function findUser({ userId }) {
  const user = await UserModel.findOne({ userId });
  if (!user) {
    throw new Error("Invalid user id provided, unable to find user");
  }
  return user;
}

function replaceDoc(docArray, newParams) {
  let replaced = false;
  for (let i = 0; i < docArray.length; i++) {
    if (docArray[i]._id.toString() === newParams._id) {
      docArray[i] = newParams;
      replaced = true;
      break;
    }
  }
  if (!replaced) {
    throw new Error("Invalid subdocument id, unable to replace subdocument");
  }
  return docArray;
}

function removeDoc(docArray, params) {
  const prevLength = docArray.length;
  const newDocArray = docArray.filter(
    (item) => !(item._id.toString() === params._id)
  );
  if (newDocArray.length === prevLength) {
    throw new Error("Invalid subdocument id, unable to remove subdocument");
  }
  return newDocArray;
}

function findDoc(docArray, params) {
  const subDoc = docArray.find((item) => item._id.toString() === params._id);
  if (!subDoc) {
    throw new Error("Invalid subdocument id, unable to find subdocument");
  }
  return subDoc;
}

export async function createUser(params) {
  const newUser = new UserModel(params);
  await newUser.save();
  return newUser;
}

export async function getUser(params) {
  const user = await UserModel.findOne(params);
  return user;
}

export async function getJobApplicationsForUser(userParams) {
  const user = await findUser(userParams);
  return user.jobApplications;
}

export async function addJobApplicationForUser(userParams, newJobAppParams) {
  const user = await findUser(userParams);
  const newJobApp = user.jobApplications.create(newJobAppParams);
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
