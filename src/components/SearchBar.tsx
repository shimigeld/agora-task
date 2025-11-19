import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';
import { useCountriesContext } from '../context/CountriesContext';

/** Search input with built-in search and clear icons */
export const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useCountriesContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <TextField
      value={searchTerm}
      onChange={handleChange}
      label="Search countries"
      placeholder="Try Canada, Japan, ..."
      fullWidth
      variant="outlined"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment:
            searchTerm.length > 0 ? (
              <InputAdornment position="end">
                <IconButton aria-label="Clear search" size="small" onClick={handleClear} edge="end">
                  <ClearRoundedIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : undefined,
        },
      }}
      size="medium"
      className="bg-white shadow-sm"
    />
  );
};
