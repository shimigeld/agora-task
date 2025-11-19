import axios from 'axios';
import { httpClient } from '../lib/httpClient';
import type { Country, CountryApiResponse } from '../types';

/** Query params sent to the Rest Countries API so we only fetch the fields we need. */
const FIELDS = 'name,capital,flags,population,cca3';

/** Converts an API response object into the Country shape used by the UI. */
const mapCountry = (country: CountryApiResponse): Country => ({
  code: country.cca3,
  name: country.name.common,
  capital: country.capital?.[0] ?? 'N/A',
  population: country.population,
  flagUrl: country.flags.svg || country.flags.png,
  flagAlt: country.flags.alt ?? `${country.name.common} flag`,
});

/** Fetches countries for the given searchTerm and optional AbortSignal. */
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
