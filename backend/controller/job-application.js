import {
  addContactForJobApp,
  addJobApplicationForUser,
  deleteContactForJobApp,
  deleteJobApplicationForUser,
  getJobApplicationsForUser,
  updateContactForJobApp,
  updateJobApplicationForUser,
} from "../database/helpers/job-application.js";

const JobApplicationController = {
  findJobApplicationsForUser: async (req, res) => {
    try {
      const { userId = "" } = req.query;
      const jobApps = await getJobApplicationsForUser({ userId });
      res.status(200).json({ jobApps });
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ msg: "Encountered error getting job applications!" });
    }
  },

  createJobApplicationForUser: async (req, res) => {
    try {
      const { userId, jobApp } = req.body;
      const newJobApp = await addJobApplicationForUser(
        { userId },
        {
          ...jobApp,
        }
      );
      res
        .status(200)
        .json({ msg: "Job application added!", jobApp: newJobApp });
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ msg: "Encountered error adding job application!" });
    }
  },
  updateJobApplicationForUser: async (req, res) => {
    try {
      const { jobApp } = req.body;
      await updateJobApplicationForUser(jobApp);
      res.status(200).json({ msg: "Job application updated!" });
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ msg: "Encountered error updating job application!" });
    }
  },
  deleteJobApplicationForUser: async (req, res) => {
    try {
      const { userId, jobAppId } = req.body;
      await deleteJobApplicationForUser({ userId }, { _id: jobAppId });
      res.status(200).json({ msg: "Job application deleted!" });
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ msg: "Encountered error deleting job application!" });
    }
  },

  createContactForJobApplication: async (req, res) => {
    try {
      const { userId, jobAppId, contact } = req.body;
      const newContact = await addContactForJobApp(
        { userId },
        { _id: jobAppId },
        { ...contact }
      );
      res.status(200).json({ msg: "Contact added!", contact: newContact });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Encountered error adding contact!" });
    }
  },

  updateContactForJobApplication: async (req, res) => {
    try {
      const { userId, jobAppId, contact } = req.body;
      await updateContactForJobApp(
        { userId },
        { _id: jobAppId },
        { ...contact }
      );
      res.status(200).json({ msg: "Contact updated!" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Encountered error updating contact!" });
    }
  },
  deleteContactForJobApplication: async (req, res) => {
    try {
      const { userId, jobAppId, contactId } = req.body;
      await deleteContactForJobApp(
        { userId },
        { _id: jobAppId },
        { _id: contactId }
      );
      res.status(200).json({ msg: "Contact deleted!" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Encountered error deleting contact!" });
    }
  },
};

export default JobApplicationController;
