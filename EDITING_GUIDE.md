# Midnight Store Editing Guide

The repository contains the complete private-preview storefront. The easiest way to edit the store is to clone the repository, change the relevant file, run the local checks, and push to `main`.

## Quick start

```bash
git clone git@github.com:Lekoetje/Midnight-Store.git
cd Midnight-Store
pnpm install
pnpm dev
```

Open the local preview URL printed by Vite. Before pushing changes, run:

```bash
pnpm check
pnpm test
pnpm build
```

## Main files to edit

| What you want to change | File | What to look for |
|---|---|---|
| Products, prices, descriptions, colors, specifications | `client/src/pages/Store.tsx` | The exported `products` array near the top of the file |
| Homepage hero, product section, newsletter copy | `client/src/pages/Store.tsx` | The `Home()` component |
| Product detail page layout and content blocks | `client/src/pages/Store.tsx` | The `ProductPage()` component |
| FAQ, About, Contact, Shipping, Returns text | `client/src/pages/Store.tsx` | The `infoPages` object |
| Header navigation and footer links | `client/src/pages/Store.tsx` | `Header()` and `Footer()` |
| Cart behavior and preview checkout message | `client/src/pages/Store.tsx` | `CartDrawer()` and `StoreShell()` |
| Colors, fonts, spacing, responsive layout | `client/src/index.css` | CSS variables at the top and responsive rules near the bottom |
| Routes | `client/src/App.tsx` | The `Router()` function |
| Browser title and SEO description | `client/index.html` | `<title>` and `<meta name="description">` |
| Product research and business documents | `research/` | Markdown research files |
| Project rules and master implementation prompt | `PROJECT_BRIEF.md`, `MIDNIGHT_STORE_MASTER_BUILD_PROMPT.md` | Business constraints and build specification |

## Editing products

Each product is an object in the `products` array. A product includes a URL slug, display name, price, comparison price, category, description, highlights, specifications, colors, and a visual-art type. Keep slugs stable after launch because changing them can break product links.

The current product art is CSS-based illustration. When you have approved product photography, replace the `ProductArt` component with image elements or add an image URL field to each product. Do not place large image files in `client/public`; use the project’s storage workflow for production assets.

## Editing the brand

The current visual system uses a warm paper background, ink-black text, muted sage, clay, and lavender accents, with DM Sans for body text, DM Mono for labels, and Playfair Display for editorial headings. Update the CSS variables in `client/src/index.css` first so the rest of the design stays consistent.

## Important launch safeguards

The storefront is intentionally a private preview. Do not remove the staging banner, disabled-checkout behavior, or draft-policy wording until payment, shipping, supplier, returns, analytics, and legal decisions have been reviewed. The current cart is a local client-side preview and does not create orders or process payments.

Do not commit passwords, API keys, access tokens, customer data, supplier credentials, or payment details. Use environment variables and the project’s secret-management workflow for production integrations.

## Current validation status

The current version has passed TypeScript checking, Vitest tests, production build validation, desktop visual review, and mobile visual review. Changes should be re-tested before they are pushed.
