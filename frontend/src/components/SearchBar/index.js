import { IconButton, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
const SearchBar = ({ searchFilter, setSearchFilter }) => {
  const clearSearchFilter = () => {
    setSearchFilter("");
  };

  return (
    <TextField
      className="text"
      onInput={(e) => {
        setSearchFilter(e.target.value);
      }}
      variant="outlined"
      placeholder="Search Role or Company"
      size="small"
      sx={{ width: "20rem" }}
      value={searchFilter}
      slotProps={{
        input: {
          endAdornment: searchFilter && (
            <InputAdornment position="end">
              <IconButton onClick={clearSearchFilter}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: { pr: 0.5 },
        },
      }}
    />
  );
};

export default SearchBar;
