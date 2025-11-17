# Product Management App

This is an app that allows users to add, remove, and edit items. I tried to keep it simple, but I also added a few features to showcase my Vue skills. For example, a sidebar with filters and a dedicated mobile filter modal using a custom breakpoint composable and shared store state.

All items can be sorted and filtered by category. For adding items, I used a modal, and for editing I used the Vue Router with a separate page to demonstrate routing usage.

For the data layer, I used JSON Server to simulate real API calls, and added basic success and error handling to make it feel more realistic. I later noticed JSON Server has sort capabilities, but since I wasn’t aware at the start, I handled sorting and filtering using computed properties.

For the UI, I chose PrimeVue as a small challenge and to work with ready-made components. I also decided not to use Tailwind so I could focus on writing my own vanilla CSS and show how I handle styling and layout from scratch.

## Stack

- Vue 3 + TypeScript
- Pinia for state management
- PrimeVue for UI components
- Vee-validate + Zod for forms
- Vitest for testing
- JSON Server for mock API

## Setup

Vite requires Node.js version 20.19+ or 22.12+

If you encounter errors regarding vee-validate/zod run pnpm install

```sh
npm install

or

pnpm install
```

Start the mock API:

```sh
npx json-server db.json
```

Run dev server (separate terminal):

```sh
npm run dev
```

## Project Structure

```
src/
├── components/      # UI components organized by feature
├── pages/          # Route components
├── stores/         # Pinia stores
├── composables/    # Reusable composition functions
├── services/       # API calls
├── types/          # TypeScript definitions
└── __tests__/      # Unit tests
```

## Testing

```sh
npm run test:unit
```

Tests use Vitest and cover the store logic and key components.

## Other Commands

```sh
npm run build      # Production build
npm run lint       # Run ESLint
```
