import {
  addContactForJobApp,
  addJobApplicationForUser,
  deleteContactForJobApp,
  deleteJobApplicationForUser,
  getJobApplicationsForUser,
  updateContactForJobApp,
  updateJobApplicationForUser,
} from "../database/helpers/job-application-helper.js";

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
  updateJobApplication: async (req, res) => {
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
  deleteJobApplication: async (req, res) => {
    try {
      const { jobAppId } = req.body;
      await deleteJobApplicationForUser(jobAppId);
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
      const { jobAppId, contact } = req.body;
      const newContact = await addContactForJobApp(jobAppId, contact);
      res.status(200).json({ msg: "Contact added!", contact: newContact });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Encountered error adding contact!" });
    }
  },
  updateContactForJobApplication: async (req, res) => {
    try {
      const { jobAppId, contact } = req.body;
      await updateContactForJobApp(jobAppId, contact);
      res.status(200).json({ msg: "Contact updated!" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Encountered error updating contact!" });
    }
  },
  deleteContactForJobApplication: async (req, res) => {
    try {
      const { jobAppId, contactId } = req.body;
      await deleteContactForJobApp(jobAppId, contactId);
      res.status(200).json({ msg: "Contact deleted!" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Encountered error deleting contact!" });
    }
  },
};

export default JobApplicationController;
