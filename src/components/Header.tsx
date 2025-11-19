import { Paper, Stack, Typography } from '@mui/material';
import { SearchBar } from './SearchBar';
import { SortControls } from './SortControls';

/** Renders the page header with the title, SearchBar, and SortControls */
export const Header = () => {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h3" className="font-semibold text-slate-900">
          World Countries
        </Typography>
      </div>

      <Paper className="p-4 shadow-sm" elevation={0}>
        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="w-full md:w-64">
            <SortControls />
          </div>
        </Stack>
      </Paper>
    </Stack>
  );
};
