const useSortJobAppsMenu = (handleSortJobApps, closeMenu) => {
  const handleSortInMenu = (sortingFn) => {
    sortingFn();
    closeMenu();
  };
  const sortByLatestDatetimeUpdated = () => {
    handleSortInMenu(() => {
      handleSortJobApps(
        (a, b) =>
          new Date(b.datetimeLastUpdated) - new Date(a.datetimeLastUpdated)
      );
    });
  };

  const sortByOldestDatetimeUpdated = () => {
    handleSortInMenu(() => {
      handleSortJobApps(
        (a, b) =>
          new Date(a.datetimeLastUpdated) - new Date(b.datetimeLastUpdated)
      );
    });
  };

  const sortByLatestDatetimeCreated = () => {
    handleSortInMenu(() => {
      handleSortJobApps(
        (a, b) => new Date(b.datetimeCreated) - new Date(a.datetimeCreated)
      );
    });
  };

  const sortByOldestDatetimeCreated = () => {
    handleSortInMenu(() => {
      handleSortJobApps(
        (a, b) => new Date(a.datetimeCreated) - new Date(b.datetimeCreated)
      );
    });
  };

  const sortByRole = () => {
    handleSortInMenu(() => {
      handleSortJobApps((a, b) => a.role.localeCompare(b.role));
    });
  };

  const sortByCompany = () => {
    handleSortInMenu(() => {
      handleSortJobApps((a, b) => a.company.localeCompare(b.company));
    });
  };

  return {
    sortByLatestDatetimeUpdated,
    sortByOldestDatetimeUpdated,
    sortByLatestDatetimeCreated,
    sortByOldestDatetimeCreated,
    sortByRole,
    sortByCompany,
  };
};

export default useSortJobAppsMenu;
