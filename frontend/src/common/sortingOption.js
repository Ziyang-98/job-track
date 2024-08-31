export const sortingOption = {
  newestLastUpdated: "newestLastUpdated",
  oldestLastUpdated: "oldestLastUpdated",
  newestCreated: "newestCreated",
  oldestCreated: "oldestCreated",
  byRole: "byRole",
  byCompany: "byCompany",
};

export const jobAppOptionTextToValueMap = {
  "Date Updated: Newest": sortingOption["newestLastUpdated"],
  " Date Updated: Oldest": sortingOption["oldestLastUpdated"],
  "Date Created: Newest": sortingOption["newestCreated"],
  "Date Created: Oldest": sortingOption["oldestCreated"],
  Role: sortingOption["byRole"],
  Company: sortingOption["byCompany"],
};

export const getSortingFunction = (providedSortingOption) => {
  switch (providedSortingOption) {
    case sortingOption["newestLastUpdated"]:
      return (a, b) =>
        new Date(b.datetimeLastUpdated) - new Date(a.datetimeLastUpdated);

    case sortingOption["oldestLastUpdated"]:
      return (a, b) =>
        new Date(a.datetimeLastUpdated) - new Date(b.datetimeLastUpdated);

    case sortingOption["newestCreated"]:
      return (a, b) =>
        new Date(b.datetimeCreated) - new Date(a.datetimeCreated);

    case sortingOption["oldestCreated"]:
      return (a, b) =>
        new Date(a.datetimeCreated) - new Date(b.datetimeCreated);

    case sortingOption["byRole"]:
      return (a, b) => a.role.localeCompare(b.role);

    case sortingOption["byCompany"]:
      return (a, b) => a.company.localeCompare(b.company);

    default:
      return (a, b) => 0;
  }
};
