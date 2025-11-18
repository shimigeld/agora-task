export interface CountryApiResponse {
  cca3: string;
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  population: number;
  flags: {
    svg: string;
    png: string;
    alt?: string;
  };
}

export interface Country {
  code: string;
  name: string;
  capital: string;
  population: number;
  flagUrl: string;
  flagAlt: string;
}

export type SortField = 'name' | 'population';
export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  field: SortField;
  direction: SortDirection;
}
