import { test, expect, type Page, type Route, type Request } from '@playwright/test';

const API_PATTERN = '**/restcountries.com/v3.1/**';

const MOCK_COUNTRIES = [
  { code: 'AAA', name: 'Aurelia', capital: 'Aurelia City', population: 120_000 },
  { code: 'BBB', name: 'Borealis', capital: 'Borealis Bay', population: 450_000 },
  { code: 'ZZZ', name: 'Zephyria', capital: 'Zephyria Point', population: 980_000 },
];

const MOCK_API_RESPONSE = MOCK_COUNTRIES.map(({ code, name, capital, population }) => ({
  cca3: code,
  name: { common: name, official: `${name} Official` },
  capital: [capital],
  population,
  flags: {
    svg: `https://example.com/${code}.svg`,
    png: `https://example.com/${code}.png`,
    alt: `${name} flag`,
  },
}));

type RouteHandler = (route: Route, request: Request) => Promise<void> | void;

const fulfillJson = (route: Route, body: unknown, status = 200) =>
  route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });

const setupCountriesApi = async (page: Page, handler?: RouteHandler) => {
  await page.route(API_PATTERN, handler ?? ((route) => fulfillJson(route, MOCK_API_RESPONSE)));
};

test('header shows search and sort controls', async ({ page }) => {
  await setupCountriesApi(page);
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /world countries/i })).toBeVisible();
  await expect(page.getByLabel('Search countries')).toBeVisible();
  await expect(page.getByLabel('Sort by')).toBeVisible();
});

test('search bar clear button resets the value', async ({ page }) => {
  await setupCountriesApi(page);
  await page.goto('/');

  const searchInput = page.getByLabel('Search countries');
  await searchInput.fill('Aurelia');

  const clearButton = page.getByRole('button', { name: /clear search/i });
  await expect(clearButton).toBeVisible();
  await clearButton.click();

  await expect(searchInput).toHaveValue('');
  await expect(clearButton).toHaveCount(0);
});

test('country grid renders cards and sorts by population', async ({ page }) => {
  await setupCountriesApi(page);
  await page.goto('/');

  await expect(page.getByTestId('country-card')).toHaveCount(MOCK_COUNTRIES.length);

  const firstCardTitle = page.getByTestId('country-card').first().getByRole('heading', { level: 6 });
  await expect(firstCardTitle).toHaveText('Aurelia');

  await page.getByLabel('Sort by').click();
  await page.getByRole('option', { name: /population \(descending\)/i }).click();

  await expect(page.getByTestId('country-card').first().getByRole('heading', { level: 6 })).toHaveText('Zephyria');
});

test('loader displays while data is in flight', async ({ page }) => {
  await setupCountriesApi(page, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    await fulfillJson(route, MOCK_API_RESPONSE);
  });

  await page.goto('/');

  const loadingText = page.getByText('Loading countries...');
  await expect(loadingText).toBeVisible();
  await expect(page.getByTestId('country-card')).toHaveCount(MOCK_COUNTRIES.length);
  await expect(loadingText).toHaveCount(0);
});

test('empty state appears when search has no matches', async ({ page }) => {
  const noResultsTerm = 'Atlantis';
  await setupCountriesApi(page, (route, request) => {
    const url = request.url();
    if (url.includes(`/name/${encodeURIComponent(noResultsTerm)}`)) {
      return fulfillJson(route, { status: 404, message: 'Not Found' }, 404);
    }
    return fulfillJson(route, MOCK_API_RESPONSE);
  });

  await page.goto('/');

  const searchInput = page.getByLabel('Search countries');
  await searchInput.fill(noResultsTerm);
  await page.waitForTimeout(600); // wait for debounce to fire the request

  await expect(page.getByText(`No results found for: ${noResultsTerm}`)).toBeVisible();
});

test('error dialog surfaces API failures and retry works', async ({ page }) => {
  let callCount = 0;
  const failuresBeforeRecovery = 4; // initial attempt + default react-query retries
  await setupCountriesApi(page, (route, request) => {
    if (request.url().includes('/all')) {
      callCount += 1;
      if (callCount <= failuresBeforeRecovery) {
        return fulfillJson(route, { message: 'Request failed with status code 500' }, 500);
      }
    }
    return fulfillJson(route, MOCK_API_RESPONSE);
  });

  await page.goto('/');

  const dialog = page.getByRole('dialog', { name: /unable to load countries/i });
  await expect(dialog).toBeVisible({ timeout: 10_000 });
  await expect(dialog.getByText(/request failed with status code 500/i)).toBeVisible();

  await page.getByRole('button', { name: /retry/i }).click();

  await expect(dialog).toHaveCount(0);
  await expect(page.getByTestId('country-card')).toHaveCount(MOCK_COUNTRIES.length);
});
