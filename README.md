# Online School Frontend

Interactive online school platform focused on abacus (soroban) training methods.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- SCSS Modules

## Requirements

- Node.js >= 20.11.1
- Docker (optional)

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Docker

#### Production Build

```bash
# Build and run production container
docker-compose up app

# Or manually
docker build -t online-school-frontend .
docker run -p 3000:3000 online-school-frontend
```

#### Development with Hot Reload

```bash
# Run development container with volume mounting
docker-compose up dev
```

#### Useful Docker Commands

```bash
# Build only
docker-compose build

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Remove all containers and images
docker-compose down --rmi all
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint:js` - Run ESLint
- `npm run lint:fix` - Auto-fix linting issues

## Project Structure

See [CLAUDE.md](CLAUDE.md) for detailed architecture and development guidelines.
