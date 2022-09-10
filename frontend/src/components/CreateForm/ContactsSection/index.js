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

import { styles } from "./styles";
const ContactsSection = () => {
  return (
    <Box sx={styles.contactsSection}>
      <Accordion defaultExpanded sx={styles.contactAccordian}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Add Contacts</Typography>
        </AccordionSummary>
        <AccordionDetails sx={styles.contactDetails}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            id="name"
            label="Name"
            type="name"
            variant="outlined"
            sx={styles.formItem}
          />
          <TextField
            autoFocus
            margin="dense"
            name="email"
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            sx={styles.formItem}
          />
          <TextField
            autoFocus
            margin="dense"
            name="role"
            id="role"
            label="Role"
            type="role"
            variant="outlined"
            sx={styles.formItem}
          />
          <TextField
            autoFocus
            margin="dense"
            name="met"
            id="met"
            label="Met where"
            type="met"
            variant="outlined"
            sx={styles.formItem}
          />
          <IconButton aria-label="create" size="large" sx={styles.button}>
            <AddIcon />
          </IconButton>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ContactsSection;
