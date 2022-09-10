import { useState } from "react";
import { DEFAULT_CONTACT, DEFAULT_JOB_APP } from "common/constants";
import { updateJobApp } from "api";
import { getUserIdFromLocalStorage } from "common/utils";

const useEditDialog = (refreshJobApps) => {
  const [open, setOpen] = useState(false);
  const [jobApp, setJobApp] = useState({ ...DEFAULT_JOB_APP });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleReset = () => {
    setLoading(false);
    setError(false);
    setJobApp({ ...DEFAULT_JOB_APP });
  };

  const handleClose = () => {
    handleReset();
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
      company: data.get("company"),
      status: jobApp.status,
      role: data.get("role"),
      location: data.get("location"),
      contacts: jobApp.contacts,
      jobPosting: data.get("jobPosting"),
      dateApplied: data.get("dateApplied"),
      lastContactDate: data.get("lastContactDate"),
      notes: data.get("notes"),
      _id: jobApp._id,
    };

    await updateJobApp(getUserIdFromLocalStorage(), body).catch((err) => {
      setError(true);
      console.error(err);
    });

    await refreshJobApps();
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
    error,
    formContactSuite: {
      contacts: jobApp.contacts,
      handleAddContact,
      handleDeleteContact,
      handleUpdateContacts,
    },
  };
};

export default useEditDialog;
