import { useCallback, useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const useFilteredJobApps = (jobApps, debounceDuration = 200) => {
  const [filteredJobApps, setFilteredJobApps] = useState(jobApps);
  const [searchFilter, setSearchFilter] = useState("");

  const { debouncedValue: debouncedSearchFilter } = useDebounce(
    searchFilter,
    debounceDuration
  );

  const filterJobAppsBasedOnRoleAndCompany = useCallback(
    (jobApps, searchFilter) => {
      const filteredJobApps = jobApps
        .map((a) => {
          return [...a];
        })
        .map((jobAppList) =>
          jobAppList.filter(
            (jobApp) =>
              jobApp.role.toLowerCase().includes(searchFilter.toLowerCase()) ||
              jobApp.company.toLowerCase().includes(searchFilter.toLowerCase())
          )
        );
      return filteredJobApps;
    },
    []
  );

  useEffect(() => {
    const filteredJobApps =
      debouncedSearchFilter.length !== 0
        ? filterJobAppsBasedOnRoleAndCompany(jobApps, debouncedSearchFilter)
        : jobApps;
    setFilteredJobApps(filteredJobApps);
  }, [jobApps, filterJobAppsBasedOnRoleAndCompany, debouncedSearchFilter]);

  return { filteredJobApps, searchFilter, setSearchFilter };
};

export default useFilteredJobApps;
