# GammaLearn

GammaLearn is an interactive learning app that explains market makers, options, and gamma exposure (GEX) through hands-on visuals and quizzes. It includes concept cards, a real-time hedging simulator, scenario walkthroughs, and a knowledge check.

Note: This app was created using [lovable.dev](https://lovable.dev).

## Features

- Core concept cards for market makers, options, delta hedging, and gamma exposure
- Interactive simulator that shows hedging behavior as price moves
- GEX scenarios (negative, neutral, positive) with visual flows and insights
- Interactive quiz with explanations and scoring

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui (Radix UI)
- Framer Motion
- React Router

## Getting Started

```sh
npm install
npm run dev
```

## Scripts

```sh
npm run dev        # start dev server
npm run build      # production build
npm run build:dev  # development build
npm run preview    # preview build locally
npm run lint       # eslint
npm run test       # vitest run
npm run test:watch # vitest watch
```

## Project Structure

- `src/pages/Index.tsx` — main landing page composition
- `src/components` — UI sections like the simulator, visualization, and quiz
- `src/components/ui` — shared UI primitives (shadcn/ui)

## Notes

- This is a client-side app; there is no backend.
