import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import type { Country } from '../types';

interface CountryCardProps {
  country: Country;
}

/**
 * Renders a single country's summary with consistent flag aspect ratio.
 */
export const CountryCard = ({ country }: CountryCardProps) => (
  <Card
    data-testid="country-card"
    className="h-full shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    variant="outlined"
  >
    <CardMedia
      component="img"
      image={country.flagUrl}
      alt={country.flagAlt}
      loading="lazy"
      sx={{ height: 180, width: '100%', objectFit: 'cover' }}
    />
    <CardContent>
      <Stack spacing={1}>
        <Typography variant="h6" className="font-semibold text-slate-800">
          {country.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Capital: <span className="font-medium text-slate-700">{country.capital}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Population: <span className="font-medium text-slate-700">{country.population.toLocaleString()} people</span>
        </Typography>
      </Stack>
    </CardContent>
  </Card>
);
