import { useState, useEffect } from "react";
import dayjs from "dayjs";

import { deleteJobApp, getJobApps, getUser, updateJobApp } from "api";
import { JobAppStatus } from "common/jobAppStatus";
import {
  getUserIdFromLocalStorage,
  storeUserIdFromLocalStorage,
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
  const [sortingOption, setSortingOption] = useState(defaultSortingOption);

  const refreshJobApps = async () => {
    const userId = getUserIdFromLocalStorage();
    const sortingFunction = getSortingFunction(sortingOption);

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

  // Run on app start up
  useEffect(() => {
    // Set user's stored sorting option
    const sortingOptionFromLocalStorage = getSortingOptionFromLocalStorage();
    sortingOptionFromLocalStorage &&
      setSortingOption(sortingOptionFromLocalStorage);

    // Fetch user from stored user id
    const userId = getUserIdFromLocalStorage();
    getUser(userId)
      .then((res) => {
        const { userId } = res.data;
        storeUserIdFromLocalStorage(userId);
      })
      .finally(() => {
        getJobApps(userId).then((res) => {
          const { jobApps } = res.data;
          const formattedJobApps = formatRawJobAppData(jobApps);
          const sortingFunction = getSortingFunction(
            sortingOptionFromLocalStorage ?? sortingOption
          );

          setJobApps(sortJobApps(formattedJobApps, sortingFunction));
        });
      });
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

  const handleSetSortingOption = (option) => {
    const sortingFunction = getSortingFunction(option);
    setJobApps(sortJobApps(jobApps, sortingFunction));
    setSortingOption(option);
    storeSortingOptionFromLocalStorage(option);
  };

  return {
    jobApps,
    setJobApps,
    updateStatus,
    handleDeleteJobApp,
    refreshJobApps,
    handleSetSortingOption,
  };
};

export default useJobApps;
