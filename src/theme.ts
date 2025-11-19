import { createTheme } from '@mui/material/styles';

/** Material UI theme that mirrors the Tailwind color palette. */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#f97316',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Inter, "Helvetica Neue", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  },
});
