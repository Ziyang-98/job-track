import { useState } from "react";
import { DEFAULT_CONTACT, DEFAULT_JOB_APP } from "common/constants";
import { updateJobApp } from "api";
import { formatContacts } from "common/utils";

const useEditDialog = (refreshJobApps, handleOpenNotification) => {
  const [open, setOpen] = useState(false);
  const [jobApp, setJobApp] = useState({ ...DEFAULT_JOB_APP });
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setLoading(false);
    setJobApp({ ...DEFAULT_JOB_APP });
  };

  const handleClose = () => {
    // Set timeout for smoother transition when user closes dialog
    setTimeout(handleReset, 200);
    setOpen(false);
  };

  const handleOpenEditDialog = (jobApp) => {
    setJobApp({ ...jobApp });
    setOpen(true);
  };

  const handleUpdateJobApp = (prop, newVal) => {
    const newJobApp = { ...jobApp };
    newJobApp[prop] = newVal;
    setJobApp(newJobApp);
  };

  const handleAddContact = () => {
    const newContacts = [...jobApp.contacts];

    newContacts.push({ ...DEFAULT_CONTACT });
    handleUpdateJobApp("contacts", newContacts);
  };

  const handleDeleteContact = (index) => {
    const newContacts = [...jobApp.contacts];
    newContacts.splice(index, 1);
    handleUpdateJobApp("contacts", newContacts);
  };

  const handleUpdateContacts = (index, prop, updatedValue) => {
    const newContact = { ...jobApp.contacts[index] };
    newContact[prop] = updatedValue;
    const newContacts = [...jobApp.contacts];
    newContacts[index] = newContact;
    handleUpdateJobApp("contacts", newContacts);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    const body = {
      company: data.get("company").trim(),
      status: jobApp.status,
      role: data.get("role").trim(),
      location: data.get("location").trim(),
      contacts: formatContacts(jobApp.contacts),
      jobPosting: data.get("jobPosting").trim(),
      dateApplied: data.get("dateApplied"),
      lastContactDate: data.get("lastContactDate"),
      notes: data.get("notes").trim(),
      _id: jobApp._id,
    };

    await updateJobApp(body)
      .then(() => {
        refreshJobApps().then(() => {
          handleOpenNotification(
            "Job Application Entry updated successfully!",
            1500,
            "success"
          );
        });
      })
      .catch((err) => {
        console.error(err);
        handleOpenNotification(
          "Error updating entry. Please refresh and try again later!",
          4000,
          "error"
        );
      });

    setLoading(false);
    handleClose();
  };

  return {
    editDialogProps: {
      open,
      onClose: handleClose,
    },
    handleClose,
    handleOpenEditDialog,
    handleUpdate,
    jobApp,
    loading,
    formContactSuite: {
      contacts: jobApp.contacts,
      handleAddContact,
      handleDeleteContact,
      handleUpdateContacts,
    },
  };
};

export default useEditDialog;
