import { useState } from "react";

const defaultContact = {
  name: "",
  email: "",
  role: "",
  met: "",
};

const useCreateDialog = () => {
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState([{ ...defaultContact }]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddContact = () => {
    const newContacts = [...contacts];
    newContacts.push({ ...defaultContact });
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
    handleClickOpen,
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
