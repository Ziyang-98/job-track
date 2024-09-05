import { useCallback, useMemo, useState } from "react";
import useDebounce from "./useDebounce";

const useFilteredJobApps = (jobApps, debounceDuration = 200) => {
  const [searchFilter, setSearchFilter] = useState("");

  const { debouncedValue: debouncedSearchFilter } = useDebounce(
    searchFilter,
    debounceDuration
  );

  const filterJobAppsBasedOnRoleAndCompany = useCallback(
    (jobApps, searchFilter) => {
      return jobApps.map((jobAppList) =>
        jobAppList.filter(
          (jobApp) =>
            jobApp.role.toLowerCase().includes(searchFilter.toLowerCase()) ||
            jobApp.company.toLowerCase().includes(searchFilter.toLowerCase())
        )
      );
    },
    []
  );

  const filteredJobApps = useMemo(
    () => filterJobAppsBasedOnRoleAndCompany(jobApps, debouncedSearchFilter),
    [jobApps, debouncedSearchFilter, filterJobAppsBasedOnRoleAndCompany]
  );
  return { filteredJobApps, searchFilter, setSearchFilter };
};

export default useFilteredJobApps;
