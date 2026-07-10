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
2. Vite middleware handles the request and calls server-side fetch logic.
3. Server-side fetch uses Contentstack Management SDK and applies delivery-like filters/sorting.
4. User selects fields and submits update.
5. Frontend calls `PATCH /api/products/:uid`.
6. Vite middleware proxies update to server-side update logic, which sends a `PUT` to Contentstack Management API.

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
npm install
npm run dev
```

App runs on `http://localhost:3000` by default.

## Scripts

- `npm run dev` - Start local dev server
- `npm run build` - Build production bundle
- `npm run build:check` - TypeScript build check + Vite build
- `npm run typecheck` - Run TypeScript no-emit check
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier for src files
- `npm run preview` - Preview built app

E2E scripts:

- `npm run test:chrome`
- `npm run test:firefox`
- `npm run test:chrome-headed`
- `npm run test:firefox-headed`
- `npm run test:report`
- `npm run test:report-ci`

## Notes

- Product fetch uses Management API with pagination and delivery-like filtering in code.
- Results are sorted by `marketing_rating` descending.
- The current entry is intentionally hidden from the product selection list.
