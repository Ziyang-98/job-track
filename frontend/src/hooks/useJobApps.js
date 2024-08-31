import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";

import { deleteJobApp, getJobApps, getUser, updateJobApp } from "api";
import { JobAppStatus } from "common/jobAppStatus";
import {
  getUserIdFromLocalStorage,
  storeUserIdFromLocalStorage,
  formatRawJobAppData,
} from "common/utils";

const defaultJobApps = [[], [], [], [], []];

const useJobApps = (handleOpenNotification) => {
  const [jobApps, setJobApps] = useState(defaultJobApps);

  const refreshJobApps = async () => {
    const userId = getUserIdFromLocalStorage();

    getJobApps(userId)
      .then((res) => {
        const { jobApps } = res.data;
        setJobApps(formatRawJobAppData(jobApps));
      })
      .catch((err) => {
        console.error(err);
        handleOpenNotification(
          "Error connecting to server. Please refresh and try again later!",
          4000,
          "error"
        );
      });
  };

  useEffect(() => {
    const userId = getUserIdFromLocalStorage();
    getUser(userId)
      .then((res) => {
        const { userId } = res.data;
        storeUserIdFromLocalStorage(userId);
        refreshJobApps();
      })
      .catch(() => {
        refreshJobApps();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jobAppsNumbers = useMemo(
    () => jobApps.map((ja) => ja.length),
    [jobApps]
  );

  const updateStatus = (jobApp, newStatus) => {
    if (jobApp.status === JobAppStatus.planning) {
      // Set date applied as current date if job app is moved from planning status
      jobApp.dateApplied = dayjs().format("DD/MM/YYYY").toString();
      jobApp.lastContactDate = null;
    }

    jobApp.status = newStatus;
    updateJobApp(jobApp).catch((err) => {
      console.error(err);
      handleOpenNotification(
        "Error updating status. Please refresh and try again later!",
        4000,
        "error"
      );
    });
  };

  const handleDeleteJobApp = (rawStatusType, jobAppIndex, jobAppId) => {
    const newJobApps = [...jobApps];
    newJobApps[rawStatusType].splice(jobAppIndex, 1);
    setJobApps(newJobApps);

    deleteJobApp(jobAppId)
      .then(() => {
        handleOpenNotification("Entry deleted successfully", 1500, "success");
      })
      .catch((err) => {
        console.error(err);
        handleOpenNotification(
          "Error deleting entry. Please refresh and try again later!",
          4000,
          "error"
        );
      });
  };

  return {
    jobApps,
    jobAppsNumbers,
    setJobApps,
    updateStatus,
    handleDeleteJobApp,
    refreshJobApps,
  };
};

export default useJobApps;
