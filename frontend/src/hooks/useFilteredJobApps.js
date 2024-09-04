import { useCallback, useEffect, useState } from "react";

const useFilteredJobApps = (jobApps) => {
  const [filteredJobApps, setFilteredJobApps] = useState(jobApps);
  const [searchFilter, setSearchFilter] = useState("");

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
      searchFilter.length !== 0
        ? filterJobAppsBasedOnRoleAndCompany(jobApps, searchFilter)
        : jobApps;
    setFilteredJobApps(filteredJobApps);
  }, [jobApps, filterJobAppsBasedOnRoleAndCompany, searchFilter]);

  return { filteredJobApps, searchFilter, setSearchFilter };
};

export default useFilteredJobApps;
