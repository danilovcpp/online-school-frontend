# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive online school frontend focused on abacus (soroban) training methods. The application is built with Next.js 16, React 19, and TypeScript, providing various trainer modes for mental math and calculation practice.

## Development Commands

### Running the Application
- `npm run dev` - Start development server (uses webpack explicitly)
- `npm run build` - Build for production
- `npm start` - Start production server

### Code Quality
- `npm run lint:js` - Run ESLint on .js, .ts, and .tsx files in src/
- `npm run lint:fix` - Auto-fix linting issues and format with Prettier

### Requirements
- Node.js >= 20.11.1 (specified in package.json engines)

## Architecture

### Project Structure

The codebase follows a feature-based architecture:

```
src/
├── app/                    # Next.js App Router pages
│   └── (portal)/trainers/  # Trainer pages (abacus, flash-anzan, etc.)
├── components/             # Shared UI components (Button, Input, Card, Select)
├── features/               # Feature modules
│   └── trainers/
│       ├── components/     # Trainer-specific components
│       ├── constants/      # Trainer configurations and lists
│       ├── hooks/          # Custom React hooks (use-abacus, use-flash-anzan)
│       └── pages/          # Feature page implementations
├── shared/                 # Shared constants (routes)
├── styles/                 # Global SCSS styles and mixins
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

### Key Architectural Patterns

**Feature-Based Organization**: Each trainer (abacus, flash-anzan, etc.) has its own page implementation in `src/features/trainers/pages/`, with associated components, hooks, and constants.

**Custom Hooks Pattern**: Business logic is encapsulated in custom hooks:
- `use-abacus.ts` - Manages abacus state with 6 columns, bead positions (top=5, bottom=1), and value calculations
- `use-flash-anzan.ts` - Handles Flash Anzan game flow, number generation, timing, and statistics tracking

**Route Configuration**: All routes are centralized in [src/shared/constants/routes.ts](src/shared/constants/routes.ts), imported throughout the app.

**Trainer Registry**: Trainers are registered in [src/features/trainers/constants/trainer-list.ts](src/features/trainers/constants/trainer-list.ts) with metadata (id, title, description, icon, path).

### TypeScript Configuration

- Path alias: `@/*` maps to `./src/*`
- Target: ES2017
- JSX: react-jsx (React 19)
- Strict mode enabled

### Routing

- App Router with route groups: `app/(portal)/trainers/`
- Default redirect: `/` → `/trainers/abacus` (configured in [next.config.ts](next.config.ts))
- All trainer routes follow pattern: `/trainers/{trainer-type}`

### Styling

- SCSS modules with global styles in [src/styles/globals.scss](src/styles/globals.scss)
- Variables in [src/styles/_variables.scss](src/styles/_variables.scss)
- Mixins available in [src/styles/_mixins.scss](src/styles/_mixins.scss) and [src/styles/mixins/_media.scss](src/styles/mixins/_media.scss)

## Linting and Code Style

### Import Sorting
ESLint enforces strict import order via `simple-import-sort`:
1. React and external libraries (`react`, `\w`, `@[^/]`)
2. Absolute imports from src (`@/`)
3. Types (`@/types`)
4. Parent paths (`../`)
5. Current directory (`./`)
6. Styles (`.scss`, `.css`)

### Code Standards
- Max line length: 140 characters
- Auto-formatting with Prettier
- Next.js TypeScript config with core web vitals

## Trainer Types

The application supports five trainer modes:

1. **Abacus** - Basic mode for manual number input and abacus practice
2. **Flash Anzan** - Speed math with numbers flashing briefly on screen
3. **Guess Result** - Solve problems and input correct answers
4. **Mental Visualization** - Visualize abacus mentally without physical tool
5. **Soroban** - Traditional Japanese abacus

Each trainer has its own route, page component, and configuration.

## Key Type Definitions

See [src/types/trainers.ts](src/types/trainers.ts) for:
- `TrainerType` - Union of all trainer IDs
- `Trainer` - Trainer metadata interface
- `BeadPosition`, `ColumnValue` - Abacus state types
- `FlashAnzanSettings`, `FlashAnzanStats` - Flash Anzan configuration and tracking
