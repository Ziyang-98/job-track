import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { styles } from "./styles";
const ContactsSection = ({
  contacts,
  handleAddContact,
  handleDeleteContact,
  handleUpdateContacts,
}) => {
  return (
    <Box sx={styles.contactsSection}>
      <Accordion defaultExpanded sx={styles.contactAccordian}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Add Contacts</Typography>
        </AccordionSummary>
        <AccordionDetails sx={styles.contactDetails}>
          {contacts.map((contact, index) => (
            <Box sx={styles.singleContactDetails} key={index}>
              <TextField
                margin="dense"
                name="name"
                id="name"
                label="Name"
                type="name"
                variant="outlined"
                value={contact.name}
                onChange={(event) => {
                  handleUpdateContacts(index, "name", event.target.value);
                }}
                sx={styles.formItem}
              />
              <TextField
                margin="dense"
                name="email"
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                value={contact.email}
                onChange={(event) => {
                  handleUpdateContacts(index, "email", event.target.value);
                }}
                sx={styles.formItem}
              />
              <TextField
                margin="dense"
                name="role"
                id="role"
                label="Role"
                type="role"
                variant="outlined"
                value={contact.role}
                onChange={(event) => {
                  handleUpdateContacts(index, "role", event.target.value);
                }}
                sx={styles.formItem}
              />
              <TextField
                margin="dense"
                name="met"
                id="met"
                label="Met where"
                type="met"
                variant="outlined"
                value={contact.met}
                onChange={(event) => {
                  handleUpdateContacts(index, "met", event.target.value);
                }}
                sx={styles.formItem}
              />
              <IconButton
                onClick={() => {
                  handleDeleteContact(index);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <IconButton
            aria-label="create"
            size="large"
            sx={styles.button}
            onClick={handleAddContact}
          >
            <AddIcon />
          </IconButton>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ContactsSection;
