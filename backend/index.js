import {
  getUser,
  createUser,
  getJobApplicationsForUser,
  addJobApplicationForUser,
  deleteJobApplicationForUser,
  updateJobApplicationForUser,
  addContactForJobApp,
  updateContactForJobApp,
  deleteContactForJobApp,
} from "./models/repository.js";
import express from "express";
import cors from "cors";
import { v4 } from "uuid";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Hello World from job tracker backend");
});

app.get("/user", async (req, res) => {
  let { userId = "" } = req.body;
  let user = await getUser({ userId });
  let msg = "User retrieved!";
  if (!user) {
    userId = v4();
    user = await createUser({ userId });
    msg = "New user created!";
  }

  res.status(200).json({ msg, userId: user.userId });
});

app.get("/user/job-apps", async (req, res) => {
  try {
    const { userId } = req.body;
    const jobApps = await getJobApplicationsForUser({ userId });
    res.status(200).json({ jobApps });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ msg: "Encountered error getting job applications!" });
  }
});

app.post("/user/job-apps", async (req, res) => {
  try {
    const { userId, jobApp } = req.body;
    const newJobApp = await addJobApplicationForUser({ userId }, { ...jobApp });
    res.status(200).json({ msg: "Job application added!", jobApp: newJobApp });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Encountered error adding job application!" });
  }
});

app.put("/user/job-apps", async (req, res) => {
  try {
    const { userId, jobApp } = req.body;
    await updateJobApplicationForUser({ userId }, { ...jobApp });
    res.status(200).json({ msg: "Job application updated!" });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ msg: "Encountered error updating job application!" });
  }
});

app.delete("/user/job-apps", async (req, res) => {
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
});

app.post("/user/job-apps/contacts", async (req, res) => {
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
});

app.put("/user/job-apps/contacts", async (req, res) => {
  try {
    const { userId, jobAppId, contact } = req.body;
    await updateContactForJobApp({ userId }, { _id: jobAppId }, { ...contact });
    res.status(200).json({ msg: "Contact updated!" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Encountered error updating contact!" });
  }
});

app.delete("/user/job-apps/contacts", async (req, res) => {
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
});

app.listen(8000, () => console.log("user-service listening on port 8000"));

export default app;
