import axios from 'axios';
import { httpClient } from '../lib/httpClient';
import type { Country, CountryApiResponse } from '../types';

/** Fields requested from the Rest Countries API to keep payloads lean. */
const FIELDS = 'name,capital,flags,population,cca3';

/** Maps the API response shape to the internal Country contract. */
const mapCountry = (country: CountryApiResponse): Country => ({
  code: country.cca3,
  name: country.name.common,
  capital: country.capital?.[0] ?? 'N/A',
  population: country.population,
  flagUrl: country.flags.svg || country.flags.png,
  flagAlt: country.flags.alt ?? `${country.name.common} flag`,
});

/**
 * Fetches the country list, handling empty searches and 404 "no results" gracefully.
 */
export const fetchCountries = async (searchTerm: string, signal?: AbortSignal): Promise<Country[]> => {
    const trimmed = searchTerm.trim();
    const path = trimmed ? `/name/${encodeURIComponent(trimmed)}` : '/all';

    try {
        const { data } = await httpClient.get<CountryApiResponse[]>(path, {
            params: { fields: FIELDS },
            signal,
        });
        return data.map(mapCountry);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return [];
        }
        throw error;
    }
};
