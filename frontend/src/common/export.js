import { jobAppStatusMap } from "./jobAppStatus";

export const exportToCsv = (jobApplications) => {
  // Create a CSV string builder
  let csvString =
    `Role,Company,Status,Location,Job Posting Link,Date Applied,Date Last Contacted,"Contacts (Name; Email; Role; Met Where)",Notes` +
    "\n";
  for (let i = 0; i < jobApplications.length; i++) {
    const jobApplicationsWithStatus = jobApplications[i];
    for (const application of jobApplicationsWithStatus) {
      const role = application.role ?? "";
      const company = application.company ?? "";
      const status = Object.values(jobAppStatusMap)[i];
      const location = application.location ?? "";
      const jobPostingLink = application.jobPosting ?? "";
      const dateApplied = application.dateApplied ?? "";
      const lastContactDate = application.lastContactDate ?? "";
      const contacts =
        `"${application.contacts
          ?.map((contact) => {
            return `${contact.name}; ${contact.email}; ${contact.role}; ${contact.role}`;
          })
          .join("\n")}"` ?? "";
      const notes = application.notes ?? "";

      // Append row to CSV string
      csvString += `${role},${company},${status},${location},${jobPostingLink},${dateApplied},${lastContactDate},${contacts},${notes}\n`;
    }
  }
  // Iterate through job applications

  // Create a Blob object with the CSV data
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });

  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);
  // Download the CSV file
  const a = document.createElement("a");
  a.href = url;
  a.download = "job_applications.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Revoke the URL to free resources
  URL.revokeObjectURL(url);
};
