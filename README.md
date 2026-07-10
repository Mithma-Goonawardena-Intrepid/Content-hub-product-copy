# Product Field Copy App (Contentstack Marketplace)

This project is a Contentstack Marketplace app used to copy selected fields from one product entry into the currently opened product entry.

## What This App Does

- Loads products from Contentstack through a local middleware endpoint.
- Excludes the currently opened entry from the product select dropdown.
- Lets you choose which fields to copy:
  - ETI (`product_information`)
  - Images (`product_images`)
  - Itinerary (`product_itinerary`)
  - Marketing (`marketing_rating`)
- Shows selected field values before update.
- Updates the currently opened entry via Contentstack Management API.

## Runtime Flow

1. Frontend requests `GET /api/products`.
2. Nuxt Nitro server route handles the request and calls server-side fetch logic.
3. Server-side fetch uses Contentstack Management SDK and applies delivery-like filters/sorting.
4. User selects fields and submits update.
5. Frontend calls `PATCH /api/products/:uid`.
6. Nuxt Nitro server route proxies update to server-side update logic, which sends a `PUT` to Contentstack Management API.

## Local API Endpoints

- `GET /api/products?locale=en&fetchFullList=true`
  - Returns `{ products: Product[] }`
- `PATCH /api/products/:uid?locale=en`
  - Body is partial product fields to update
  - Returns `{}` on success

## Configuration

Create a `.env` file in the project root. At minimum for fetch/update flows, set:

- `CONTENTSTACK_API_KEY` (or `VITE_CONTENTSTACK_API_KEY`)
- `CONTENTSTACK_MANAGEMENT_TOKEN` (or `VITE_CONTENTSTACK_MANAGEMENT_TOKEN`)

Optional but recommended:

- `CONTENTSTACK_BRANCH_ALIAS` (or `VITE_CONTENTSTACK_BRANCH_ALIAS`)
- `CONTENTSTACK_RUNTIME_HOST` (or `VITE_CONTENTSTACK_RUNTIME_HOST`)

The app also supports additional Contentstack config values used by shared clients (environment, delivery token, preview token, live preview).

## Development

```bash
yarn install
yarn dev
```

App runs on `http://localhost:3000` by default (or next available port if `3000` is already in use).

## Scripts

- `yarn dev` - Start Nuxt 4 dev server
- `yarn build` - Build Nuxt production output
- `yarn build:check` - Nuxt typecheck + Nuxt build
- `yarn typecheck` - Run Nuxt typecheck
- `yarn lint` - Run ESLint
- `yarn format` - Run Prettier for src files
- `yarn preview` - Preview Nuxt production build

E2E scripts:

- `yarn test:chrome`
- `yarn test:firefox`
- `yarn test:chrome-headed`
- `yarn test:firefox-headed`
- `yarn test:report`
- `yarn test:report-ci`

## Notes

- Product fetch uses Management API with pagination and delivery-like filtering in code.
- Results are sorted by `marketing_rating` descending.
- The current entry is intentionally hidden from the product selection list.
