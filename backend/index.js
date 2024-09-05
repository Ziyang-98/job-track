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

/* Healthcheck Endpoints */
app.get("/", (req, res) => {
  res.send("Hello World from job tracker backend");
});

/* User Endpoints */
app.get("/user", UserController.getUser);
app.delete("/user", UserController.deleteUser);

/* Job Application Endpoints */
app.get(
  "/job-application",
  JobApplicationController.findJobApplicationsForUser
);
app.post(
  "/job-application",
  JobApplicationController.createJobApplicationForUser
);
app.put("/job-application", JobApplicationController.updateJobApplication);
app.delete("/job-application", JobApplicationController.deleteJobApplication);
app.post(
  "/job-application/contacts",
  JobApplicationController.createContactForJobApplication
);
app.put(
  "/job-application/contacts",
  JobApplicationController.updateContactForJobApplication
);
app.delete(
  "/job-application/contacts",
  JobApplicationController.deleteContactForJobApplication
);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`user-service listening on port ${port}`));

export default app;
