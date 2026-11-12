# NOVA Store

A bilingual (Persian / English) storefront built on [FakeStoreAPI](https://fakestoreapi.com). It covers a product listing with search, category filters, sorting and pagination, plus a persistent cart, light/dark themes and full RTL support.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You are redirected to `/fa` (Persian is the default locale); switch to English from the header.

| Variable                   | Purpose                                       | Default                    |
| -------------------------- | --------------------------------------------- | -------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Product API base URL                          | `https://fakestoreapi.com` |
| `NEXT_PUBLIC_SITE_URL`     | Absolute URLs for canonical links and sitemap | `http://localhost:3000`    |

### Scripts

| Command                | What it does                       |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Start the dev server               |
| `npm run build`        | Production build                   |
| `npm start`            | Serve the production build         |
| `npm run lint`         | ESLint                             |
| `npm run typecheck`    | Generate route types and run `tsc` |
| `npm run format:check` | Check formatting with Prettier     |

## Features

- **Product listing:** search (title and description), category filter, sort by price or title, paginated six per page.
- **Cart:** add, change quantity, remove, clear (with confirmation). Survives reloads.
- **Two locales:** Persian (RTL) and English (LTR), with localized numbers, prices and plurals.
- **Light and dark themes:** follow the system preference until the user picks one.
- **Loading, empty and error states:** skeletons while loading, an empty state for no results, and a retry button when the API fails.
- **SEO:** per-locale metadata, `hreflang` alternates, sitemap and robots. The cart is `noindex`.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · styled-components · next-intl · Zustand · Axios · Formik + Yup

## Key decisions

### The URL is the source of truth for the product list

Search, category, sort and page live in the query string (`/fa?category=electronics&sort=price-asc&page=2`). The server page parses and validates them in [`parseProductQuery`](src/utils/productQuery.ts), so invalid values fall back to defaults instead of breaking the page. As a result, every filtered view can be shared and bookmarked, renders on the server, and works with the back button.

### Filtering happens on the server, in memory

FakeStoreAPI has no search, filter or pagination parameters, and the whole catalogue is 20 products. The server fetches all products and applies the query in [`queryProducts`](src/utils/productQuery.ts) before rendering. Against a real API, this work would move into the request parameters.

### The cart lives in localStorage

The cart is client-only state (Zustand with `persist`). FakeStoreAPI's cart endpoints don't actually save anything, so there is no backend cart to sync with. Only the fields the cart needs are stored, not the whole product.

The server can't read localStorage, so the store uses `skipHydration`. The cart page and header badge render a placeholder until the stored cart has loaded, which avoids hydration mismatches.

### Theme without a flash

A small inline script in `<head>` sets `data-theme` before first paint. All colours are CSS custom properties, so switching themes only changes that attribute and no styles are regenerated. Spacing, radii and breakpoints come from a styled-components theme ([`designTokens`](src/utils/designTokens.ts)).

### RTL and i18n

- Layout uses logical CSS properties (`padding-inline`, `inset-inline-end`), so one stylesheet serves both directions.
- Product titles from the API are English. They are marked `lang="en"` with `unicode-bidi: plaintext` so punctuation stays in the right order on Persian pages.
- Prices are in US dollars, as the API provides. Only the digits and separators are localized.
- Messages are typed against the dictionary, so a missing translation key is a compile error.

### Errors

API calls are wrapped in [`toApiResult`](src/api/handleApiError.ts), which returns `{ ok: true, data }` or `{ ok: false, error }`. Errors are typed with an error code (network, timeout, not found, server), so pages handle them explicitly and show a localized message. If the products request fails, only the product section shows an error, and the rest of the page still renders.

### Accessibility

- Skip link, landmarks and a logical heading order.
- The modal and mobile drawer trap focus, close on Escape and return focus to the button that opened them.
- Icon-only buttons require an accessible name at the type level.
- Cart actions and result counts are announced through live regions.
- 44px minimum touch targets, visible focus outlines, and `prefers-reduced-motion` support.

## Project structure

```
src/
├── app/[locale]/      Routes: home, cart, error and not-found pages
├── api/               Axios instance and error normalisation
├── requests/          API calls
├── components/        Feature components (Home, Cart, Layout, Common)
├── shared/            Reusable UI: Button, Modal, Select, Pagination…
├── modals/            Modals built on shared/Modal
├── storage/           Zustand cart store
├── context/           Theme provider
├── dictionary/        fa.json, en.json
├── types/             Domain types and enums
├── utils/             Query parsing, formatting, SEO, i18n helpers
├── validations/       Yup schemas
└── proxy.ts           Locale detection and redirect
```
