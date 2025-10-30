# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive online school frontend focused on abacus (soroban) training methods. The application is built with Next.js 16, React 19, and TypeScript, providing various trainer modes for mental math and calculation practice.

## Development Commands

### Running the Application
- `npm run dev` - Start development server (uses webpack explicitly)
- `npm run build` - Build for production
- `npm start` - Start production server

### Docker Support
- `docker-compose up app` - Build and run production container
- `docker-compose up dev` - Run development container with hot reload and volume mounting
- `docker-compose build` - Build containers without starting them
- `docker-compose down` - Stop and remove containers
- Dockerfile uses multi-stage build with standalone output optimization for production builds

### Code Quality
- `npm run lint:js` - Run ESLint on .js, .ts, and .tsx files in src/
- `npm run lint:fix` - Auto-fix linting issues and format with Prettier

### Requirements
- Node.js >= 20.11.1 (specified in package.json engines)
- Docker (optional, for containerized development/deployment)

## Architecture

### Project Structure

The codebase follows a feature-based architecture:

```
src/
├── app/                    # Next.js App Router pages
│   ├── (portal)/           # Authenticated portal routes
│   │   ├── courses/        # Course catalog and individual courses
│   │   ├── dashboard/      # User dashboard
│   │   ├── profile/        # User profile
│   │   ├── settings/       # User settings
│   │   └── trainers/       # Trainer pages (abacus, flash-anzan, etc.)
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── layout.tsx          # Root layout with AuthProvider
│   └── page.tsx            # Home page (landing or redirect to dashboard)
├── components/             # Shared UI components (Button, Input, Card, Select, etc.)
├── contexts/               # React Context providers (AuthContext)
├── features/               # Feature modules
│   ├── auth/               # Authentication feature
│   │   ├── components/     # Auth-specific components
│   │   └── pages/          # Auth page implementations
│   ├── courses/            # Course-related features
│   │   └── data/           # Course content data
│   ├── landing/            # Landing page feature
│   │   └── pages/          # Landing page implementation
│   └── trainers/           # Trainer features
│       ├── components/     # Trainer-specific components
│       ├── constants/      # Trainer configurations and lists
│       ├── hooks/          # Custom React hooks (use-abacus, use-flash-anzan, etc.)
│       └── pages/          # Trainer page implementations
├── hooks/                  # Shared React hooks (use-uncontrolled)
├── services/               # API services layer
│   └── api/                # API client implementations (auth-api, profile-api, config)
├── shared/                 # Shared constants (routes)
├── styles/                 # Global SCSS styles and mixins
│   ├── mixins/             # SCSS mixins (_media.scss, _hover.scss)
│   ├── globals.scss        # Global styles
│   ├── _variables.scss     # SCSS variables
│   └── _mixins.scss        # SCSS mixin imports
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions (delay, generateRandomNumber, getSuperscript, jwt-decode, token-storage)
```

### Key Architectural Patterns

**Feature-Based Organization**: Each trainer (abacus, flash-anzan, etc.) has its own page implementation in `src/features/trainers/pages/`, with associated components, hooks, and constants.

**Custom Hooks Pattern**: Business logic is encapsulated in custom hooks in `src/features/trainers/hooks/`:
- `use-abacus.ts` - Manages abacus state with 6 columns, bead positions (top bead=5, bottom beads=1 each), and value calculations
  - Columns are indexed right-to-left: index 0 = ones, index 1 = tens, etc.
  - Provides methods: `toggleTopBead()`, `toggleBottomBead()`, `setValue()`, `reset()`, `getColumnValue()`, `getColumnLabel()`
- `use-flash-anzan.ts` - Handles Flash Anzan game flow, number generation, timing, and statistics tracking
- `use-guess-result.ts` - Manages guess result trainer state and logic
- `use-schulte-table.ts` - Handles Schulte table generation and tracking
- `use-stroop-test.ts` - Manages Stroop test flow and statistics
- `use-lipman-test.ts` - Handles Lipman test grid generation and marking

**Shared Hooks**: Common hooks in `src/hooks/`:
- `use-uncontrolled.ts` - Manages controlled/uncontrolled component state pattern for form inputs, enabling components to work in both controlled and uncontrolled modes

**Route Configuration**: All routes are centralized in [src/shared/constants/routes.ts](src/shared/constants/routes.ts), imported throughout the app.

**Trainer Registry**: Trainers are registered in [src/features/trainers/constants/trainer-list.ts](src/features/trainers/constants/trainer-list.ts) with metadata (id, title, description, icon, path).

**API Services Layer**: API clients in `src/services/api/`:
- `auth-api.ts` - Authentication endpoints (login, register, refresh)
- `profile-api.ts` - User profile endpoints (get profile, update profile)
- `config.ts` - API configuration and base URL setup

**Context Pattern**: React Context is used for cross-cutting concerns:
- `AuthContext` - Global authentication state management located in [src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx)
  - Provides `useAuth()` hook for accessing authentication state
  - Handles JWT token management with automatic refresh
  - Token storage utilities in [src/utils/token-storage.ts](src/utils/token-storage.ts)

### TypeScript Configuration

- Path alias: `@/*` maps to `./src/*`
- Target: ES2017
- JSX: react-jsx (React 19)
- Strict mode enabled
- Custom type roots: `./@types` for extended type definitions

### Next.js Configuration

**Image Optimization**: Configured remote patterns in [next.config.ts](next.config.ts):
- Local development: `http://localhost:9000/avatars/**`
- Production: `http://s3api.runex.space/school-avatars/avatars/**`

**Output Mode**: Uses `standalone` output for optimized Docker builds

### Routing

- App Router with route groups: `app/(portal)/` for authenticated pages (trainers, dashboard, courses, profile, settings)
- Home page (`/`) shows landing page for unauthenticated users, redirects to `/dashboard` for authenticated users
- Auth pages: `/login` and `/register` (not in portal route group)
- All trainer routes follow pattern: `/trainers/{trainer-type}`
- Routes are centralized in [src/shared/constants/routes.ts](src/shared/constants/routes.ts)

### Styling

- SCSS modules with global styles in [src/styles/globals.scss](src/styles/globals.scss)
- CSS variables defined in [src/styles/_variables.scss](src/styles/_variables.scss) including:
  - Color palette (primary, secondary, accent, success, error with gradients and opacity variants)
  - Typography (font sizes, weights, line heights)
  - Spacing scale and border radii
  - Shadows and z-index layers
  - Transitions and animations (fadeInUp, fadeInDown, slideIn, shimmer, shake, pulse, etc.)
- Mixins available in [src/styles/_mixins.scss](src/styles/_mixins.scss):
  - Media query mixins: `@mixin max-tablet()` (768px), `@mixin max-mobile()` (480px)
  - Hover effect mixins in [src/styles/mixins/_hover.scss](src/styles/mixins/_hover.scss)

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
- ESLint configuration in [eslint.config.mjs](eslint.config.mjs) using flat config format

## Application Features

The application includes several main sections accessible via the portal route group:

- **Dashboard** (`/dashboard`) - User dashboard with progress tracking and stats
- **Courses** (`/courses`) - Course catalog and individual course pages (e.g., `/courses/mental-arithmetic-level-1`)
- **Trainers** (`/trainers`) - Interactive training modules (see Trainer Types below)
- **Profile** (`/profile`) - User profile page with avatar management
- **Settings** (`/settings`) - User settings and preferences

## Trainer Types

The application currently supports six active trainer modes:

1. **Abacus** (`/trainers/abacus`) - Basic mode for manual number input and abacus practice
2. **Flash Anzan** (`/trainers/flash-anzan`) - Speed math with numbers flashing briefly on screen
3. **Guess Result** (`/trainers/guess-result`) - Solve problems and input correct answers
4. **Schulte Table** (`/trainers/schulte-table`) - Concentration and peripheral vision training
5. **Stroop Test** (`/trainers/stroop-test`) - Cognitive control and selective attention training
6. **Lipman Test** (`/trainers/lipman-test`) - Attention concentration and selective perception training

Each trainer has its own route, page component in `src/features/trainers/pages/`, custom hook in `src/features/trainers/hooks/`, and is registered in the trainer list.

## Adding New Trainers

To add a new trainer, follow this pattern:

1. **Add Type**: Add the trainer ID to `TrainerType` union in [src/types/trainers.ts](src/types/trainers.ts)
2. **Add Route**: Add the route to `routes.trainers` object in [src/shared/constants/routes.ts](src/shared/constants/routes.ts)
3. **Create Types**: Define settings and stats interfaces in [src/types/trainers.ts](src/types/trainers.ts)
4. **Create Hook**: Implement business logic in `src/features/trainers/hooks/use-{trainer-name}.ts`
5. **Create Page**: Implement page component in `src/features/trainers/pages/{trainer-name}/`
6. **Add Route File**: Create `src/app/(portal)/trainers/{trainer-name}/page.tsx` that imports the page component
7. **Register Trainer**: Add trainer metadata to `trainerList` in [src/features/trainers/constants/trainer-list.ts](src/features/trainers/constants/trainer-list.ts)

## Key Type Definitions

See [src/types/trainers.ts](src/types/trainers.ts) for:

**Trainer Types:**
- `TrainerType` - Union of all trainer IDs ('abacus', 'flash-anzan', 'guess-result', etc.)
- `Trainer` - Trainer metadata interface (id, title, description, icon, path)

**Abacus Types:**
- `BeadPosition` - Bead position data (column, type, index, active)
- `ColumnValue` - Column value data (column, value)

**Flash Anzan Types:**
- `FlashAnzanSettings` - Configuration (count, speed, digits, allowNegative)
- `FlashAnzanStats` - Statistics tracking (correct, wrong, accuracy)

**Guess Result Types:**
- `GuessResultSettings` - Configuration (count, speed, digits, allowNegative)
- `GuessResultStats` - Statistics tracking (correct, wrong, accuracy, averageTime, totalRounds)

**Schulte Table Types:**
- `SchulteTableSettings` - Configuration (gridSize, shuffle)
- `SchulteTableStats` - Statistics tracking (completedGames, bestTime, averageTime, lastTime)

**Stroop Test Types:**
- `StroopColor` - Color definition (name in Russian, hex)
- `StroopTestSettings` - Configuration (rounds, mode: congruent/incongruent/mixed)
- `StroopTestStats` - Statistics tracking (completedTests, bestTime, averageTime, accuracy, totalCorrect, totalWrong)

**Lipman Test Types:**
- `LipmanTestSettings` - Configuration (rows, cols, targetLetters)
- `LipmanTestStats` - Statistics tracking (completedTests, bestTime, averageTime, accuracy, totalCorrect, totalWrong)
- `LipmanCell` - Cell data (letter, isTarget, isMarked, isCorrect)
