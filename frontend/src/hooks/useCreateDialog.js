import { useState } from "react";
import { DEFAULT_CONTACT } from "common/constants";

const useCreateDialog = () => {
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState([{ ...DEFAULT_CONTACT }]);

  const handleOpenCreateDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
    const data = new FormData(event.currentTarget);
    const body = {
      company: data.get("company"),
      status: data.get("status"),
      role: data.get("role"),
      location: data.get("location"),
      contacts,
      jobPosting: data.get("jobPosting"),
      dateApplied: data.get("dateApplied"),
      lastContactDate: data.get("lastContactDate"),
      notes: data.get("notes"),
    };
    console.log(body);
  };

  return {
    createDialogProps: {
      open,
      onClose: handleClose,
    },
    handleClose,
    handleOpenCreateDialog,
    handleCreateJobApp,
    formContactSuite: {
      contacts,
      handleAddContact,
      handleDeleteContact,
      handleUpdateContacts,
    },
  };
};

export default useCreateDialog;
