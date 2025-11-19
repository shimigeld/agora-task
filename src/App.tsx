import { Container, Stack } from '@mui/material';
import { Content } from './components/Content';
import { Header } from './components/Header';
import { CountriesProvider } from './context/CountriesContext';

/** Top-level React component that renders the layout */
function App() {
  return (
    <CountriesProvider>
      <div className="min-h-screen bg-slate-50 py-10">
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Header />
            <Content />
          </Stack>
        </Container>
      </div>
    </CountriesProvider>
  );
}

export default App;
