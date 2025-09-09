# Backend Documentation

## Technology Stack:
- Bun runtime (see `src/backend/package.json`)
- Hono.js web framework
- PostgreSQL database
- JWT for authentication

## Structure:
- API routes are organized in `src/backend/routes/`
- Controllers are in `src/backend/controllers/`
- Middleware is in `src/backend/middleware/`
- Database configuration is in `src/backend/config/database.js`

## Database:
PostgreSQL is used with the following tables:
- users
- creator_profiles
- brand_profiles
- campaigns
- proposals
- contact_submissions

## How to Run:
1. Navigate to the backend directory: `cd src/backend`
2. Install dependencies: `bun install`
3. Set up environment variables in `.env`
4. Initialize the database: `bun run init-db`
5. Start the server: `bun run dev`

## API Endpoints:
- `POST /api/auth/register/creator` - Register a new creator
- `POST /api/auth/register/brand` - Register a new brand
- `POST /api/auth/login` - Login any user
- `GET /api/creators` - Get all creators
- `GET /api/creators/:id` - Get a specific creator
- `PUT /api/creators/profile` - Update creator profile
- `POST /api/campaigns` - Create a new campaign
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns/:id/apply` - Apply to a campaign
- `POST /api/ai/match` - AI-powered creator matching
- `POST /api/contact` - Submit contact form