import jobApplicationModel from "../models/job-application-model.js";
import UserModel from "../models/user-model.js";
import { findUser } from "./utils.js";

export async function createUser(params) {
  const newUser = new UserModel(params);
  await newUser.save();
  return newUser;
}

export async function getUser(params) {
  const user = await UserModel.findOne(params);
  return user;
}

export async function deleteUser(params) {
  const user = await findUser(params);
  // Delete all job applications of user
  for (const jobAppId of user.jobApplications) {
    await jobApplicationModel.findByIdAndDelete(jobAppId);
  }
  await UserModel.deleteOne(params);
  return user;
}
