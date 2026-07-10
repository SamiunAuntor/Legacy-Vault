# LegacyVault Frontend

The LegacyVault frontend is a React + Vite application for users, successors, and admins. It handles authentication, dashboard workflows, claim submission, and vault access screens while communicating with the backend API through Axios services.

## What This App Does

- Presents the public landing page and authentication screens
- Lets vault owners manage documents, successors, verification questions, final wishes, future messages, claims, and account settings
- Provides a public claim portal for successors
- Provides a vault access screen for approved successors
- Provides protected admin screens for claim review, audit logs, dashboard data, and system management views

## Tech Stack

- React 19
- Vite
- React Router
- TanStack Query
- Firebase Authentication
- Axios
- Tailwind CSS
- Framer Motion
- React Hook Form
- Zod
- Lucide React
- React Hot Toast

## Folder Structure

```text
src/
|-- app/              # App-level providers
|-- assets/           # Images and static frontend assets
|-- components/       # Shared UI, auth, layout, and dashboard components
|-- constants/        # Route, role, and sidebar constants
|-- contexts/         # Auth context
|-- firebase/         # Firebase client configuration
|-- hooks/            # Custom React hooks
|-- layouts/          # Main, dashboard, admin, and successor layouts
|-- pages/            # Public, auth, dashboard, admin, claim, and successor pages
|-- routes/           # Router and route guards
|-- services/         # API clients by domain
|-- styles/           # Global styles
|-- utils/            # Formatting, storage, and Firebase error helpers
|-- App.jsx
|-- main.jsx
```

## Environment Variables

Create a `.env` file inside `client/`:

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

`VITE_API_URL` is optional during local development because the app falls back to `http://localhost:5000/api/v1`.

## Installation

```bash
npm install
```

## Development

Start the Vite dev server:

```bash
npm run dev
```

Default URL:

```text
http://localhost:5173
```

Make sure the backend is running on `http://localhost:5000` or update `VITE_API_URL` to match your backend URL.

## Available Scripts

```bash
npm run dev      # Start local development server
npm run build    # Build production assets
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Main Routes

Public and auth routes:

- `/` - Public home page
- `/login` - User login
- `/register` - User registration
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset screen

Successor routes:

- `/claim` - Successor claim portal
- `/vault-access` - Released vault access screen

Vault owner dashboard routes:

- `/dashboard` - Authenticated user dashboard overview
- `/dashboard/documents` - Document vault
- `/dashboard/successors` - Successor management
- `/dashboard/verification` - Verification questions
- `/dashboard/final-wishes` - Final wishes
- `/dashboard/future-messages` - Future messages
- `/dashboard/claims` - User claims
- `/dashboard/settings` - Profile and account settings

Admin routes:

- `/admin` - Admin claims management
- `/admin/dashboard` - Admin overview
- `/admin/documents` - Admin documents view
- `/admin/successors` - Admin successors view
- `/admin/audit-logs` - Audit logs
- `/admin/system-health` - System health view
- `/admin/settings` - Admin settings view

## API Communication

The shared Axios client lives in `src/services/api.js`.

- Base URL comes from `VITE_API_URL`
- If a Firebase user is active, the client requests a Firebase ID token
- If no Firebase user is active, it falls back to the stored token from `src/utils/storage.js`
- Tokens are attached as `Authorization: Bearer <token>`
- Domain-specific API wrappers live in `src/services/`

Service files:

- `admin.service.js`
- `auth.service.js`
- `claim.service.js`
- `document.service.js`
- `finalWish.service.js`
- `firebase.service.js`
- `futureMessage.service.js`
- `profile.service.js`
- `question.service.js`
- `successor.service.js`
- `token.service.js`

## Authentication

Firebase client configuration lives in `src/firebase/firebase.config.js`. Missing Firebase environment values are logged in the browser console to make setup issues easier to diagnose.

Protected routes are handled by:

- `src/routes/PrivateRoute.jsx` for authenticated users
- `src/routes/AdminRoute.jsx` for admin-only pages
- `src/routes/SuccessorRoute.jsx` for successor access patterns

Authentication state is exposed through:

- `src/contexts/AuthContext.jsx`
- `src/hooks/useAuth.js`

## Key UI Areas

- `pages/public/Home.jsx` defines the first public experience.
- `pages/auth/` contains login, registration, forgot password, and reset password screens.
- `pages/dashboard/` contains owner-facing vault management screens.
- `pages/claim/ClaimPortal.jsx` contains successor claim submission.
- `pages/successor/VaultAccess.jsx` contains released vault access.
- `pages/admin/` contains admin claim review and operational screens.
- `layouts/` contains the route shells used by public, dashboard, admin, and successor screens.

## Styling

Global styles live in `src/styles/globals.css`. The project uses Tailwind CSS through the Vite plugin and shared layout/component files for consistent dashboard and admin presentation.

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

Preview the production build:

```bash
npm run preview
```

## Local Development Checklist

1. Create `client/.env`.
2. Create and configure `server/.env`.
3. Add `server/firebase/serviceAccountKey.json`.
4. Start the backend with `npm run dev` inside `server/`.
5. Start the frontend with `npm run dev` inside `client/`.
6. Open `http://localhost:5173`.

## Troubleshooting

**Blank page or Firebase config warnings**

Check all `VITE_FIREBASE_*` variables in `client/.env`.

**API requests fail**

Confirm `VITE_API_URL` points to the backend API base, usually `http://localhost:5000/api/v1`.

**Unauthorized requests**

Confirm the user is signed in and the backend is receiving an `Authorization` header.

**Admin page redirects or fails**

Confirm the signed-in user has role `ADMIN` in the backend user record.

**CORS error**

Confirm the backend `CLIENT_URL` matches the frontend origin.
