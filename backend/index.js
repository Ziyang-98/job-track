import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import UserController from "./controller/user-controller.js";
import JobApplicationController from "./controller/job-application-controller.js";

// Connect to db
const mongoDBURI =
  process.env.ENV === "PROD"
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

console.log("Connecting to DB:", mongoDBURI);
mongoose.connect(mongoDBURI);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Hello World from job tracker backend");
});

app.get("/user", UserController.getUser);

app.delete("/user", UserController.deleteUser);

app.get("/user/job-apps", JobApplicationController.findJobApplicationsForUser);

app.post(
  "/user/job-apps",
  JobApplicationController.createJobApplicationForUser
);

app.put("/user/job-apps", JobApplicationController.updateJobApplication);

app.delete("/user/job-apps", JobApplicationController.deleteJobApplication);

app.post(
  "/user/job-apps/contacts",
  JobApplicationController.createContactForJobApplication
);

app.put(
  "/user/job-apps/contacts",
  JobApplicationController.updateContactForJobApplication
);

app.delete(
  "/user/job-apps/contacts",
  JobApplicationController.deleteContactForJobApplication
);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`user-service listening on port ${port}`));

export default app;
