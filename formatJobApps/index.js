const functions = require("@google-cloud/functions-framework");
const escapeHtml = require("escape-html");
const axios = require("axios");

const JOB_APP_ENDPOINT =
  "https://job-application-tracker-361814.as.r.appspot.com/user/job-apps";

const formatRawJobAppData = (rawJobApps) => {
  const newJobApps = [[], [], [], [], []];

  rawJobApps.forEach((rawJobApp) => {
    newJobApps[parseInt(rawJobApp.status)].push({ ...rawJobApp });
  });
  return newJobApps;
};

functions.http("formatJobApps", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST");
  const { userId } = req.query;

  // Data retrieval from server
  new axios.get(`${JOB_APP_ENDPOINT}?userId=${userId}`)
    .then((response) => {
      const { jobApps } = response.data;

      // Data cleanup
      const formattedJobApps = formatRawJobAppData(jobApps);

      res.status(200).json({ jobApps: formattedJobApps });
    })
    .catch((err) => {
      console.error(err);
      const { msg = "Encountered error contacting server!" } = err;
      res.send(msg).status(400).json({ msg });
    });
});
