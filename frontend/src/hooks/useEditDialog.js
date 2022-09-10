import { useState } from "react";
import { DEFAULT_CONTACT, DEFAULT_JOB_APP } from "common/constants";

const useEditDialog = (refreshJobApps) => {
  const [open, setOpen] = useState(false);
  const [jobApp, setJobApp] = useState({ ...DEFAULT_JOB_APP });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEditDialog = (jobApp) => {
    setJobApp({ ...jobApp });
    setOpen(true);
  };

  const updateJobApp = (prop, newVal) => {
    const newJobApp = { ...jobApp };
    newJobApp[prop] = newVal;
    setJobApp(newJobApp);
  };

  const handleAddContact = () => {
    const newContacts = [...jobApp.contacts];

    newContacts.push({ ...DEFAULT_CONTACT });
    updateJobApp("contacts", newContacts);
  };

  const handleDeleteContact = (index) => {
    const newContacts = [...jobApp.contacts];
    newContacts.splice(index, 1);
    updateJobApp("contacts", newContacts);
  };

  const handleUpdateContacts = (index, prop, updatedValue) => {
    const newContact = { ...jobApp.contacts[index] };
    newContact[prop] = updatedValue;
    const newContacts = [...jobApp.contacts];
    newContacts[index] = newContact;
    updateJobApp("contacts", newContacts);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
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
    };

    // TODO: Update job app in the backend;
    console.log(body);

    await refreshJobApps();
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
    formContactSuite: {
      contacts: jobApp.contacts,
      handleAddContact,
      handleDeleteContact,
      handleUpdateContacts,
    },
  };
};

export default useEditDialog;
