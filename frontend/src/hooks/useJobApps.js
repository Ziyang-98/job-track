import { JobAppStatus } from "common/jobAppStatus";
import dayjs from "dayjs";
import { useState } from "react";
const dummyJobApps = [
  [
    {
      company: "Famous Company",
      status: 0,
      role: "Software Engineer",
      location: "Singapore",
      contacts: [],
      jobPosting: "",
      dateApplied: null,
      lastContactDate: null,
      notes: "Interview round 3",
      _id: "5474",
    },
  ],
  [
    {
      company: "TikTok2",
      status: 1,
      role: "Software Engineer",
      location: "Singapore",
      contacts: [
        {
          name: "John Doe",
          email: "johndoe@tiktok.com",
          role: "Recruiter",
          met: "At NUS career fair",
        },
      ],
      jobPosting: "https://careers.tiktok.com/resume/7132808706191313188/apply",
      dateApplied: "24/08/2022",
      lastContactDate: "26/08/2022",
      notes: "Interview round 3",
      _id: "2521",
    },
    {
      company: "TikTok3",
      status: 1,
      role: "Software Engineer",
      location: "Singapore",
      contacts: [],
      jobPosting: "https://careers.tiktok.com/resume/7132808706191313188/apply",
      dateApplied: "24/08/2022",
      lastContactDate: "26/08/2022",
      notes: "Interview round 3",
      _id: "123",
    },
  ],
  [
    {
      company: "Famous Company",
      status: 2,
      role: "Software Engineer",
      location: "Singapore",
      contacts: [],
      jobPosting: "",
      dateApplied: "24/08/2022",
      lastContactDate: "26-08-2022",
      notes: "Interview round 3",
      _id: "7543",
    },
  ],
  [
    {
      company: "Famous Company",
      status: 3,
      role: "Software Engineer",
      location: "Singapore",
      contacts: [],
      jobPosting: "",
      dateApplied: "24/08/2022",
      lastContactDate: "26/08/2022",
      notes: "Interview round 3",
      _id: "87565",
    },
  ],
  [
    {
      company: "Famous Company",
      status: 4,
      role: "Software Engineer",
      location: "Singapore",
      contacts: [],
      jobPosting: "",
      dateApplied: "24/08/2022",
      lastContactDate: "26/08/2022",
      notes: "Interview round 3",
      _id: "346",
    },
  ],
];

const useJobApps = () => {
  const [jobApps, setJobApps] = useState([...dummyJobApps]);

  const refreshJobApps = async () => {
    console.log("refreshing job apps");
    // TODO: Pull data from backend and setJobApps to data
  };

  // TODO: Implement useEffect logic to pull data when importing

  const updateStatus = (jobApp, newStatus) => {
    if (jobApp.status === JobAppStatus.planning) {
      // Set date applied as current date if job app is moved from planning status
      jobApp.dateApplied = dayjs().format("DD/MM/YYYY").toString();
      jobApp.lastContactDate = null;
    }

    jobApp.status = parseInt(newStatus);
    // TODO: Update Job from database with new status

    refreshJobApps();
  };

  const handleDeleteJobApp = (rawStatusType, jobAppIndex, jobAppId) => {
    const newJobApps = [...jobApps];
    newJobApps[rawStatusType].splice(jobAppIndex, 1);
    setJobApps(newJobApps);

    // TODO: Delete Job from database with jobAppId

    refreshJobApps();
  };
  return {
    jobApps,
    setJobApps,
    updateStatus,
    handleDeleteJobApp,
    refreshJobApps,
  };
};

export default useJobApps;
