import { Box } from '@mui/material';
import { useCountriesContext } from '../context/CountriesContext';
import { CountryCard } from './CountryCard';

/** Grid of countries that display CountryCard according to search term(if any) and sorting order. */
export const CountryGrid = () => {
  const { sortedCountries } = useCountriesContext();

  return (
    <Box
      className="py-6"
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, minmax(0, 1fr))',
          sm: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(3, minmax(0, 1fr))',
          lg: 'repeat(4, minmax(0, 1fr))',
        },
      }}
    >
      {sortedCountries.map((country) => (
        <CountryCard key={country.code} country={country} />
      ))}
    </Box>
  );
};
