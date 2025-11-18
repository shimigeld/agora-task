# World Countries Explorer

Production-ready React 19 + Vite application that showcases every country using the REST Countries API. Features TanStack Query powered data fetching, Material UI components styled with Tailwind CSS utilities, sorting, debounced search, and complete Docker deployment instructions.

## Tech Stack

- React 19 + Vite + TypeScript
- Material UI 7 with custom theme
- Tailwind CSS 3 for utility styling
- TanStack Query 5 for async state and caching
- Axios HTTP client
- REST Countries public API (`https://restcountries.com`)
- Docker + nginx for production serving

## Getting Started

```bash
npm install
npm run dev
```

- `npm run dev` starts Vite dev server with HMR.
- `npm run build` type-checks and bundles the app.
- `npm run preview` serves the production bundle locally.

## Docker

Build and run the production container with nginx:

```bash
docker build -t countries-app .
docker run -p 8080:80 countries-app
```

Visit `http://localhost:8080` to view the optimized build.

## Features

- Responsive grid of Material UI cards with flag, name, capital, and formatted population.
- Search input with 500 ms debounce that refetches via TanStack Query.
- Sorting controls for name (A–Z) and population (ascending/descending).
- Dedicated loader, error dialog with retry, and empty-state messaging.
- Strongly typed API layer, hooks, and components with reusable providers and theme setup.
