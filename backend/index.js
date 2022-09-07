import {
  getUser,
  createUser,
  getJobApplicationsForUser,
  addJobApplicationForUser,
  deleteJobApplicationForUser,
  updateJobApplicationForUser,
} from "./model/repository.js";
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
  const { userId } = req.body;
  const jobApps = await getJobApplicationsForUser({ userId });
  if (jobApps) {
    res.status(200).json({ jobApps });
  } else {
    res.status(400).json({ msg: "Invalid user id!" });
  }
});

app.post("/user/job-apps", async (req, res) => {
  const { userId, jobApp } = req.body;
  try {
    await addJobApplicationForUser({ userId }, { ...jobApp });
    res.status(200).json({ msg: "Job application added!" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Invalid job parameters!" });
  }
});

app.put("/user/job-apps", async (req, res) => {
  const { userId, jobApp } = req.body;
  try {
    await updateJobApplicationForUser({ userId }, { ...jobApp });
    res.status(200).json({ msg: "Job application updated!" });
  } catch {
    res.status(400).json({ msg: "Invalid job parameters!" });
  }
});

app.delete("/user/job-apps", async (req, res) => {
  const { userId, jobAppId } = req.body;
  await deleteJobApplicationForUser({ userId }, { _id: jobAppId });
  res.status(200).json({ msg: "Job application deleted!" });
});

app.listen(8000, () => console.log("user-service listening on port 8000"));
