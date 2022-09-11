import { useState } from "react";
import { DEFAULT_CONTACT } from "common/constants";
import { createJobApp } from "api";
import { formatContacts, getUserIdFromLocalStorage } from "common/utils";

const useCreateDialog = (refreshJobApps, handleOpenNotification) => {
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState([{ ...DEFAULT_CONTACT }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleOpenCreateDialog = () => {
    setOpen(true);
  };

  const reset = () => {
    setContacts([{ ...DEFAULT_CONTACT }]);
    setLoading(false);
    setError(false);
  };
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handleAddContact = () => {
    const newContacts = [...contacts];
    newContacts.push({ ...DEFAULT_CONTACT });
    setContacts(newContacts);
  };

  const handleDeleteContact = (index) => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  const handleUpdateContacts = (index, prop, updatedValue) => {
    const newContact = { ...contacts[index] };
    newContact[prop] = updatedValue;
    const newContacts = [...contacts];
    newContacts[index] = newContact;
    setContacts(newContacts);
  };

  const handleCreateJobApp = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const body = {
      company: data.get("company").trim(),
      status: data.get("status"),
      role: data.get("role").trim(),
      location: data.get("location").trim(),
      contacts: formatContacts(contacts),
      jobPosting: data.get("jobPosting").trim(),
      dateApplied: data.get("dateApplied"),
      lastContactDate: data.get("lastContactDate"),
      notes: data.get("notes").trim(),
    };

    await createJobApp(getUserIdFromLocalStorage(), body)
      .then(() => {
        refreshJobApps().then(() => {
          handleOpenNotification(
            "Job Application Entry created successfully!",
            1500,
            "success"
          );
        });
      })
      .catch((err) => {
        console.error(err);
        handleOpenNotification(
          "Error creating entry. Please refresh and try again later!",
          4000,
          "error"
        );
      });

    setLoading(false);

    handleClose();
  };

  return {
    createDialogProps: {
      open,
      onClose: handleClose,
    },
    handleClose,
    handleOpenCreateDialog,
    handleCreateJobApp,
    loading,
    error,
    formContactSuite: {
      contacts,
      handleAddContact,
      handleDeleteContact,
      handleUpdateContacts,
    },
  };
};

export default useCreateDialog;
