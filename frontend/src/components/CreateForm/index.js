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

import { jobAppStatusMap } from "common/jobAppStatus";

import { styles } from "./styles";
const statues = Object.values(jobAppStatusMap);

const CreateForm = () => {
  const [status, setStatus] = React.useState("");
  const [dateApplied, setDateApplied] = React.useState(null);
  const [lastContactDate, setLastContactDate] = React.useState(null);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <Box sx={styles.form}>
      <TextField
        autoFocus
        margin="dense"
        id="company"
        label="Company"
        type="company"
        variant="outlined"
        sx={styles.formItem}
      />
      <FormControl fullWidth sx={styles.formItem}>
        <InputLabel id="status-select-label">Job Application Status</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-simple-select"
          value={status}
          label="Job Application Status"
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
        autoFocus
        margin="dense"
        id="role"
        label="Role"
        type="role"
        variant="outlined"
        sx={styles.formItem}
      />

      <TextField
        autoFocus
        margin="dense"
        id="location"
        label="Location"
        type="location"
        variant="outlined"
        sx={styles.formItem}
      />
      <TextField
        autoFocus
        margin="dense"
        id="jobPosting"
        label="Job Posting Link"
        type="jobPosting"
        variant="outlined"
        sx={styles.formItem}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date Applied"
          value={dateApplied}
          onChange={(newValue) => {
            setDateApplied(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} sx={styles.formItem} />
          )}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date Last Contacted"
          value={lastContactDate}
          onChange={(newValue) => {
            setLastContactDate(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} sx={styles.formItem} />
          )}
        />
      </LocalizationProvider>

      <TextField
        autoFocus
        margin="dense"
        id="notes"
        label="Additional notes"
        type="notes"
        variant="outlined"
        multiline
        rows={2}
        sx={styles.formItem}
      />
    </Box>
  );
};

export default CreateForm;
