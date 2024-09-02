import { toDate } from "./utils";

export const sortingOption = {
  newestLastUpdated: "newestLastUpdated",
  oldestLastUpdated: "oldestLastUpdated",
  newestCreated: "newestCreated",
  oldestCreated: "oldestCreated",
  newestDateApplied: "newestDateApplied",
  oldestDateApplied: "oldestDateApplied",
  newestLastContactDate: "newestLastContactDate",
  oldestLastContactDate: "oldestLastContactDate",
  byRole: "byRole",
  byCompany: "byCompany",
};

export const jobAppOptionTextToValueMap = {
  "Date Updated: Newest": sortingOption["newestLastUpdated"],
  "Date Updated: Oldest": sortingOption["oldestLastUpdated"],
  "Date Created: Newest": sortingOption["newestCreated"],
  "Date Created: Oldest": sortingOption["oldestCreated"],
  "Date Applied: Newest": sortingOption["newestDateApplied"],
  "Date Applied: Oldest": sortingOption["oldestDateApplied"],
  "Date Last Contacted: Newest": sortingOption["newestLastContactDate"],
  "Date Last Contacted: Oldest": sortingOption["oldestLastContactDate"],
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

    case sortingOption["newestDateApplied"]:
      return (a, b) => {
        if (a.dateApplied === null || b.dateApplied === null) {
          return b.dateApplied === null ? -1 : 1;
        }
        const dateA = toDate(a.dateApplied);
        const dateB = toDate(b.dateApplied);
        return dateB - dateA;
      };

    case sortingOption["oldestDateApplied"]:
      return (a, b) => {
        if (a.dateApplied === null || b.dateApplied === null) {
          return b.dateApplied === null ? -1 : 1;
        }
        const dateA = toDate(a.dateApplied);
        const dateB = toDate(b.dateApplied);
        return dateA - dateB;
      };

    case sortingOption["newestLastContactDate"]:
      return (a, b) => {
        if (a.lastContactDate === null || b.lastContactDate === null) {
          return b.lastContactDate === null ? -1 : 1;
        }
        const dateA = toDate(a.lastContactDate);
        const dateB = toDate(b.lastContactDate);
        return dateB - dateA;
      };

    case sortingOption["oldestLastContactDate"]:
      return (a, b) => {
        if (a.lastContactDate === null || b.lastContactDate === null) {
          return b.lastContactDate === null ? -1 : 1;
        }
        const dateA = toDate(a.lastContactDate);
        const dateB = toDate(b.lastContactDate);
        return dateA - dateB;
      };
    case sortingOption["byRole"]:
      return (a, b) => a.role.localeCompare(b.role);

    case sortingOption["byCompany"]:
      return (a, b) => a.company.localeCompare(b.company);

    default:
      return (a, b) => 0;
  }
};
