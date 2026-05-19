# onx-screens

## Stack

- **Framework**: SvelteKit (Svelte 5) with static adapter
- **Package manager**: pnpm — always use `pnpm` for installs and scripts, never `npm` or `yarn`
- **Styling**: Tailwind CSS v4 with the Typography plugin (`@tailwindcss/typography`)

## Common commands

```bash
pnpm dev       # start dev server
pnpm build     # production build
pnpm preview   # preview production build
```

## Project layout

```
src/
  routes/      # SvelteKit file-based routes
  lib/         # shared utilities and assets
static/        # static assets served at root
```
