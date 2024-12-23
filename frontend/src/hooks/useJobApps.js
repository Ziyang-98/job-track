import { useState, useEffect } from "react";
import dayjs from "dayjs";

import { deleteJobApp, getJobApps, getUser, updateJobApp } from "api";
import { JobAppStatus } from "common/jobAppStatus";
import {
  getUserIdFromLocalStorage,
  storeUserIdInLocalStorage,
  formatRawJobAppData,
  sortJobApps,
  getSortingOptionFromLocalStorage,
  storeSortingOptionFromLocalStorage,
} from "common/utils";
import { getSortingFunction, sortingOption } from "common/sortingOption";

const defaultJobApps = [[], [], [], [], []];
const defaultSortingOption = sortingOption["newestLastUpdated"];

const useJobApps = (handleOpenNotification) => {
  const [jobApps, setJobApps] = useState(defaultJobApps);
  const [activeSortingOption, setActiveSortingOption] =
    useState(defaultSortingOption);
  const [isFetchingJobApps, setIsFetchingJobApps] = useState(false);

  const refreshJobApps = async () => {
    const userId = getUserIdFromLocalStorage();
    const sortingFunction = getSortingFunction(activeSortingOption);

    getJobApps(userId)
      .then((res) => {
        const { jobApps } = res.data;
        const formattedJobApps = formatRawJobAppData(jobApps);
        setJobApps(sortJobApps(formattedJobApps, sortingFunction));
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

  async function fetchJobAppOnFirstLoad() {
    // Set user's stored sorting option
    const sortingOptionFromLocalStorage = getSortingOptionFromLocalStorage();
    sortingOptionFromLocalStorage &&
      setActiveSortingOption(sortingOptionFromLocalStorage);
    const userId = getUserIdFromLocalStorage();
    try {
      const userRes = await getUser(userId);
      const { userId: receivedUserId } = userRes.data;
      storeUserIdInLocalStorage(receivedUserId);
      const jobAppsRes = await getJobApps(receivedUserId);
      const { jobApps } = jobAppsRes.data;
      const formattedJobApps = formatRawJobAppData(jobApps);
      const sortingFunction = getSortingFunction(
        sortingOptionFromLocalStorage ?? activeSortingOption
      );
      setJobApps(sortJobApps(formattedJobApps, sortingFunction));
    } catch (err) {
      console.error(err);
      handleOpenNotification(
        "Error connecting to server. Please refresh and try again later!",
        4000,
        "error"
      );
    } finally {
      setIsFetchingJobApps(false);
    }
  }
  // Run on app start up
  useEffect(() => {
    fetchJobAppOnFirstLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSetActiveSortingOption = (option) => {
    const sortingFunction = getSortingFunction(option);
    setJobApps(sortJobApps(jobApps, sortingFunction));
    setActiveSortingOption(option);
    storeSortingOptionFromLocalStorage(option);
  };

  return {
    jobApps,
    setJobApps,
    updateStatus,
    handleDeleteJobApp,
    refreshJobApps,
    activeSortingOption,
    handleSetActiveSortingOption,
    isFetchingJobApps,
  };
};

export default useJobApps;
