import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useCountriesContext } from '../context/CountriesContext';

/** Shows an error dialog with a retry button when ther request was failed */
export const ErrorDialog = () => {
  const { isError, error, refetch } = useCountriesContext();

  return (
    <Dialog open={isError} aria-labelledby="error-title">
      <DialogTitle id="error-title">Unable to load countries</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {error?.message || 'Something went wrong while fetching countries. Please try again.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={refetch} variant="contained" color="primary">
          Retry
        </Button>
      </DialogActions>
    </Dialog>
  );
};
