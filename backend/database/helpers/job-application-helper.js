import {
  findDoc,
  findJobApplication,
  findUser,
  removeDoc,
  replaceDoc,
} from "./utils.js";
import JobApplicationModel from "../models/job-application-model.js";
import UserModel from "../models/user-model.js";
import mongoose from "mongoose";

export async function getJobApplicationsForUser(userParams) {
  const user = await findUser(userParams);
  await user.populate("jobApplications");
  return user.jobApplications;
}

export async function addJobApplicationForUser(userParams, newJobAppParams) {
  const user = await findUser(userParams);
  const currentDatetime = new Date().toISOString();
  const newJobApp = new JobApplicationModel({
    user,
    ...newJobAppParams,
    datetimeLastUpdated: currentDatetime,
    datetimeCreated: currentDatetime,
  });
  await newJobApp.save();
  user.jobApplications.push(newJobApp);
  await user.save();
  return { ...newJobAppParams, _id: newJobApp._id };
}

export async function updateJobApplicationForUser(newJobAppParams) {
  const currentDatetime = new Date().toISOString();
  await JobApplicationModel.updateOne(
    {
      _id: newJobAppParams._id,
    },
    { ...newJobAppParams, datetimeLastUpdated: currentDatetime }
  );
}

export async function deleteJobApplicationForUser(jobAppId) {
  const ObjectId = mongoose.Types.ObjectId;
  const jobAppObjectId = ObjectId.createFromHexString(jobAppId);
  await JobApplicationModel.findByIdAndDelete(jobAppObjectId)
    .then((jobApplication) => {
      if (!jobApplication) {
        throw new Error("Job application not found");
      }

      // Update the user's document to remove the job application ID
      return UserModel.updateOne(
        { _id: jobApplication.user },
        { $pull: { jobApplications: jobAppObjectId } }
      );
    })
    .then((result) => {
      if (result.matchedCount === 0 || result.modifiedCount === 0) {
        throw new Error(
          "User not found or job application not associated with user"
        );
      }
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Error removing job application");
    });
}

export async function addContactForJobApp(jobAppId, newContactParams) {
  const jobApp = await findJobApplication(jobAppId);
  const newContact = jobApp.contacts.create(newContactParams);
  jobApp.contacts.push(newContact);
  await jobApp.save();
  return newContact;
}

export async function updateContactForJobApp(jobAppId, newContactParams) {
  const jobApp = await findJobApplication(jobAppId);
  jobApp.contacts = replaceDoc(jobApp.contacts, newContactParams);
  await jobApp.save();
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
