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

const corsOptions = {
  origin: [process.env.ALLOWED_ORIGIN],
  optionsSuccessStatus: 200,
};
console.log("Connecting to DB:", mongoDBURI);
console.log("Allowed Origin:", process.env.ALLOWED_ORIGIN);

mongoose.connect(mongoDBURI);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions)); // config cors so that front-end can use
// app.options("*", cors());

/* Healthcheck Endpoints */
app.get("/", (req, res) => {
  res.send("Hello World from job tracker backend");
});

/* User Endpoints */
app.get("/user", cors(corsOptions), UserController.getUser);
app.delete("/user", UserController.deleteUser);

/* Job Application Endpoints */
app.get(
  "/job-application",
  cors(corsOptions),
  JobApplicationController.findJobApplicationsForUser
);
app.post(
  "/job-application",
  cors(corsOptions),
  JobApplicationController.createJobApplicationForUser
);
app.put(
  "/job-application",
  cors(corsOptions),
  JobApplicationController.updateJobApplication
);
app.delete(
  "/job-application",
  cors(corsOptions),
  JobApplicationController.deleteJobApplication
);
app.post(
  "/job-application/contacts",
  cors(corsOptions),
  JobApplicationController.createContactForJobApplication
);
app.put(
  "/job-application/contacts",
  cors(corsOptions),
  JobApplicationController.updateContactForJobApplication
);
app.delete(
  "/job-application/contacts",
  cors(corsOptions),
  JobApplicationController.deleteContactForJobApplication
);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`user-service listening on port ${port}`));

export default app;
