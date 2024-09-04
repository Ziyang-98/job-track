import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const SearchBar = ({ searchFilter, setSearchFilter }) => (
  <TextField
    id="search-bar"
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
        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
      },
    }}
  />
);

export default SearchBar;
