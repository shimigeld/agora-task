import { Box, CircularProgress, Typography } from '@mui/material';

/**  Loadeder while the countries request is pending/loading. */
export const Loader = () => (
  <Box className="flex flex-col items-center justify-center py-16" role="status">
    <CircularProgress color="primary" size={64} thickness={4} />
    <Typography variant="subtitle1" className="mt-4 text-slate-500">
      Loading countries...
    </Typography>
  </Box>
);
