# Playroom AI

A proxy server for AI chat applications using Vercel AI SDK.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm run dev
```

```bash
# Open the frontend in your browser
open http://localhost:3000
```

## Authentication

This server supports optional OIDC authentication for the chat API. To enable:

1. Set up your OIDC provider and obtain client credentials
2. Configure the `.env` file with your OIDC settings
3. Set `REQUIRE_AUTH=true` to enforce authentication

### Authentication Flow

When authentication is required:
1. Frontend redirects to `/auth/login?returnTo=YOUR_FRONTEND_URL`
2. User authenticates with the OIDC provider
3. Server creates a session and redirects back to frontend
4. Frontend includes the session cookie in API requests

### Auth Endpoints

- `GET /auth/login` - Initiates the OIDC authentication flow
- `GET /auth/callback` - OIDC provider redirect endpoint
- `GET /auth/logout` - Clears the user session
- `GET /auth/status` - Returns current authentication status
