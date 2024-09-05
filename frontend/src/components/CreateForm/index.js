import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { JobAppStatus, jobAppStatusMap } from "common/jobAppStatus";
import { convertStringToDayjs } from "common/utils";
import useMediaQuery from "@mui/material/useMediaQuery";

import ContactsSection from "./ContactsSection";

import { useStyles } from "./styles";

const statues = Object.values(jobAppStatusMap);

const CreateForm = ({ formContactSuite, type, jobApp }) => {
  const [status, setStatus] = React.useState(jobApp.status);
  const [dateApplied, setDateApplied] = React.useState(
    convertStringToDayjs(jobApp.dateApplied)
  );
  const [lastContactDate, setLastContactDate] = React.useState(
    convertStringToDayjs(jobApp.lastContactDate)
  );
  const isSmall = useMediaQuery("(max-width:550px)");

  const styles = useStyles(isSmall);
  const {
    contacts,
    handleAddContact,
    handleDeleteContact,
    handleUpdateContacts,
  } = formContactSuite;

  const hasApplied = () => {
    const statusToCheck = type === "create" ? status : jobApp.status;

    return parseInt(statusToCheck) !== JobAppStatus.planning;
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <Box sx={styles.form}>
      <TextField
        autoFocus={type === "create"}
        required
        margin="dense"
        name="role"
        id="role"
        label="Role"
        type="role"
        variant="outlined"
        defaultValue={jobApp.role}
        sx={styles.formItem}
      />
      <TextField
        required
        margin="dense"
        name="company"
        id="company"
        label="Company (Max 20 Characters)"
        type="company"
        variant="outlined"
        defaultValue={jobApp.company}
        inputProps={{ maxLength: 20 }}
        sx={styles.formItem}
      />
      <FormControl sx={styles.formItem}>
        <InputLabel id="status-select-label">Job Application Status</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-simple-select"
          defaultValue={jobApp.status}
          value={status}
          name="status"
          label="Job Application Status"
          required
          disabled={type === "edit"}
          onChange={handleChange}
        >
          {statues.map((s, index) => (
            <MenuItem key={s} value={index}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        margin="dense"
        id="location"
        label="Location"
        name="location"
        type="location"
        variant="outlined"
        defaultValue={jobApp.location}
        sx={styles.formItem}
      />

      <ContactsSection
        contacts={contacts}
        handleAddContact={handleAddContact}
        handleDeleteContact={handleDeleteContact}
        handleUpdateContacts={handleUpdateContacts}
      />
      <TextField
        margin="dense"
        id="jobPosting"
        label="Job Posting Link"
        name="jobPosting"
        type="jobPosting"
        variant="outlined"
        defaultValue={jobApp.jobPosting}
        sx={styles.formItem}
      />
      {hasApplied() && (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date Applied"
              value={dateApplied}
              onChange={(newValue) => {
                setDateApplied(newValue);
              }}
              format={"DD/MM/YYYY"}
              sx={styles.formItem}
              name="dateApplied"
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date Last Contacted"
              value={lastContactDate}
              onChange={(newValue) => {
                setLastContactDate(newValue);
              }}
              format={"DD/MM/YYYY"}
              sx={styles.formItem}
              name="lastContactDate"
            />
          </LocalizationProvider>
        </>
      )}
      <TextField
        margin="dense"
        id="notes"
        label="Additional notes"
        type="notes"
        variant="outlined"
        name="notes"
        multiline
        minRows={2}
        defaultValue={jobApp.notes}
        sx={styles.formItem}
      />
    </Box>
  );
};

export default CreateForm;
