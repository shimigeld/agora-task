import { Box, Typography } from '@mui/material';
import { useCountriesContext } from '../context/CountriesContext';

/**
 * Communicates that a search returned no matches and mirrors the current query.
 */
export const EmptyState = () => {
  const { debouncedSearch } = useCountriesContext();

  return (
    <Box className="flex flex-col items-center justify-center py-16 text-center">
      <Typography variant="h6" className="text-slate-700">
        No results found for: {debouncedSearch || 'your search'}
      </Typography>
      <Typography variant="body2" className="mt-2 text-slate-500">
        Try adjusting your search term or sorting preferences.
      </Typography>
    </Box>
  );
};
