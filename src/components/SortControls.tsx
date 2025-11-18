import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { SortOption } from '../types';
import { useCountriesContext } from '../context/CountriesContext';

const SORT_KEY = {
  NameAsc: 'name-asc',
  NameDesc: 'name-desc',
  PopulationAsc: 'population-asc',
  PopulationDesc: 'population-desc',
} as const;

type SortKey = (typeof SORT_KEY)[keyof typeof SORT_KEY];

const SORT_OPTIONS: Record<SortKey, SortOption> = {
  [SORT_KEY.NameAsc]: { field: 'name', direction: 'asc' },
  [SORT_KEY.NameDesc]: { field: 'name', direction: 'desc' },
  [SORT_KEY.PopulationAsc]: { field: 'population', direction: 'asc' },
  [SORT_KEY.PopulationDesc]: { field: 'population', direction: 'desc' },
};

/**
 * Dropdown select that maps UI-friendly labels to SortOption values.
 */
export const SortControls = () => {
  const { sortOption, setSortOption } = useCountriesContext();

  const handleChange = (event: SelectChangeEvent<SortKey>) => {
    const key = event.target.value as SortKey;
    const selected = SORT_OPTIONS[key];
    if (selected) {
      setSortOption(selected);
    }
  };

  const currentKey =
    (Object.entries(SORT_OPTIONS).find(
      ([, option]) => option.field === sortOption.field && option.direction === sortOption.direction,
    )?.[0] as SortKey | undefined) || SORT_KEY.NameAsc;

  return (
    <FormControl fullWidth>
      <InputLabel id="sort-label">Sort by</InputLabel>
      <Select labelId="sort-label" label="Sort by" value={currentKey} onChange={handleChange} className="bg-white shadow-sm">
        <MenuItem value={SORT_KEY.NameAsc}>Name (A–Z)</MenuItem>
        <MenuItem value={SORT_KEY.NameDesc}>Name (Z–A)</MenuItem>
        <MenuItem value={SORT_KEY.PopulationAsc}>Population (ascending)</MenuItem>
        <MenuItem value={SORT_KEY.PopulationDesc}>Population (descending)</MenuItem>
      </Select>
    </FormControl>
  );
};
