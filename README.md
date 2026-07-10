# LegacyVault

LegacyVault is a secure digital inheritance platform for preserving important documents, final wishes, future messages, and successor access instructions. It combines a React frontend with an Express/MongoDB backend, Firebase authentication, Cloudinary document storage, and an admin-reviewed claim workflow.

The application is designed for a sensitive real-world problem: helping a person organize important personal, family, financial, legal, and digital asset information before it is needed, while making sure access is only released to a trusted successor after verification and admin review.

## Table of Contents

- [Problem Statement](#problem-statement)
- [Solution Overview](#solution-overview)
- [Core Features](#core-features)
- [User Roles](#user-roles)
- [End-to-End Workflow](#end-to-end-workflow)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Run Locally](#run-locally)
- [API Areas](#api-areas)
- [Data Model Summary](#data-model-summary)
- [Security Highlights](#security-highlights)
- [Demo Flow](#demo-flow)
- [Troubleshooting](#troubleshooting)
- [Documentation](#documentation)
- [Future Improvements](#future-improvements)
- [License](#license)

## Problem Statement

Important life records are often scattered across paper files, cloud drives, email inboxes, phones, bank portals, and private notes. When a person becomes unavailable, their family or trusted representative may not know:

- What documents exist
- Where critical information is stored
- Who is allowed to access it
- Which wishes or instructions should be followed
- How to verify the right successor without exposing private data too early

LegacyVault solves this by giving users a private vault where they can store sensitive information and define a trusted successor. Access is not automatic. A successor must submit a claim, answer verification questions, and wait for admin approval before released vault information becomes available.

## Solution Overview

LegacyVault has three main experiences:

- **Vault owner experience**: A registered user stores documents, final wishes, future messages, verification questions, and successor details.
- **Successor experience**: A trusted successor submits a claim and, after approval, accesses released vault materials.
- **Admin experience**: Admins review claims, approve or reject access, inspect dashboard data, and view audit logs.

The project is a hackathon-ready full-stack MERN-style application with clear module boundaries, authentication, role-based admin protection, file upload support, and a claim verification workflow.

## Core Features

- Firebase-backed authentication with protected user and admin areas
- Personal dashboard for documents, successors, verification questions, final wishes, future messages, claims, and settings
- Secure document upload and retrieval through backend-controlled Cloudinary storage
- Successor management and vault access flow
- Verification questions with hashed answers
- Claim submission with verification scoring
- Admin claim approval and rejection workflow
- Audit logging for important vault and claim events
- Separate public, authenticated, successor, and admin interfaces

## User Roles

LegacyVault currently uses:

- `USER`: Vault owner with access to the personal dashboard
- `ADMIN`: Platform reviewer with access to admin claim management and audit logs

Successor access is represented through successor records and claim verification routes instead of a normal persisted user role.

## End-to-End Workflow

1. A user creates an account and signs in.
2. The user adds important documents to the vault.
3. The user registers a trusted successor.
4. The user creates verification questions.
5. The user writes final wishes and future messages.
6. A successor visits the claim portal.
7. The successor submits identity details and verification answers.
8. The backend scores the verification answers.
9. The claim enters admin review.
10. An admin approves or rejects the claim.
11. If approved, successor vault access is granted.
12. Released documents, wishes, and future messages become available through the vault access flow.

## Tech Stack

**Frontend**

- React 19
- Vite
- React Router
- TanStack Query
- Firebase Web SDK
- Axios
- Tailwind CSS
- Framer Motion
- React Hook Form
- Zod
- Lucide React

**Backend**

- Node.js
- Express 5
- MongoDB + Mongoose
- Firebase Admin SDK
- Cloudinary
- Multer
- JWT
- bcryptjs
- Zod
- Morgan

## Architecture

```text
React + Vite Client
        |
        | Axios requests with Firebase/JWT bearer tokens
        v
Express API (/api/v1)
        |
        | Controllers validate request flow
        v
Service modules
        |
        | Mongoose models
        v
MongoDB

External services:
- Firebase Authentication for client auth and backend token verification
- Cloudinary for document and profile photo uploads
```

## Project Structure

```text
LegacyVault/
|-- client/                 # React + Vite frontend
|   |-- src/
|   |   |-- app/            # App providers
|   |   |-- components/     # Shared UI and layout components
|   |   |-- contexts/       # Auth context
|   |   |-- firebase/       # Firebase client configuration
|   |   |-- layouts/        # Public, dashboard, admin, successor layouts
|   |   |-- pages/          # Route-level screens
|   |   |-- routes/         # Router and route guards
|   |   |-- services/       # API service wrappers
|   |   |-- styles/         # Global styles
|   |   |-- utils/          # Storage, formatting, Firebase error helpers
|   |-- README.md
|
|-- server/                 # Express API
|   |-- src/
|   |   |-- config/         # MongoDB, Firebase, Cloudinary, Multer config
|   |   |-- constants/      # Shared constants
|   |   |-- middlewares/    # Auth, role, error middleware
|   |   |-- modules/        # Feature modules
|   |   |-- routes/         # API route registration
|   |   |-- app.js          # Express app setup
|   |   |-- server.js       # Server bootstrap
|   |-- README.md
|
|-- LICENSE
|-- README.md
```

## Environment Setup

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Create `server/.env`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
DATABASE_URL=
JWT_SECRET=
FIREBASE_WEB_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Place the Firebase Admin SDK service account at:

```text
server/firebase/serviceAccountKey.json
```

The repository `.gitignore` excludes `.env`, `node_modules`, `dist`, and the Firebase service account file.

## Run Locally

Install and start the backend:

```bash
cd server
npm install
npm run dev
```

Install and start the frontend in a second terminal:

```bash
cd client
npm install
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:5000`
- API base: `http://localhost:5000/api/v1`

## API Areas

The backend API is mounted under `/api/v1` and organized by feature module:

- `/auth` - registration, login, Firebase login, current user, profile update, photo upload
- `/successors` - successor CRUD, access status, released vault data
- `/questions` - verification question management
- `/documents` - upload, list, open, download, status update, delete
- `/final-wishes` - final wish CRUD
- `/future-messages` - future message CRUD
- `/claims` - claim submission, verification questions, user claim history
- `/admin` - admin dashboard, pending claims, approvals, rejections, audit logs

See [server/README.md](server/README.md) for the full endpoint list.

## Data Model Summary

- **User**: stores identity, email, Firebase UID, role, active status, profile photo URL, and profile photo public ID.
- **Document**: stores owner, document name, category, Cloudinary URL/public ID, file metadata, and status.
- **Successor**: stores owner, successor identity details, relationship, verification state, access state, and status.
- **Question**: stores owner, question text, and hashed answer.
- **FinalWish**: stores owner, category, title, and content.
- **FutureMessage**: stores owner, title, message type, content or file URL, and release state.
- **Claim**: stores successor claim details, score, answer counts, review state, and admin review metadata.
- **AuditLog**: stores actor ID, action, entity, entity ID, metadata, and timestamp history.

## Security Highlights

- Firebase authentication is used on the frontend and verified by the backend.
- Protected API routes require bearer tokens.
- Admin endpoints require the `ADMIN` role.
- Verification answers are hashed with bcrypt.
- Files are uploaded through backend-controlled Multer and Cloudinary flows.
- Environment variables and Firebase service account credentials are excluded from Git.
- Audit logs record important claim and vault events.
- CORS is restricted to `http://localhost:5173` and the configured `CLIENT_URL`.

## Demo Flow

For a complete demo, run both apps and walk through this sequence:

1. Register or log in as a vault owner.
2. Add a successor from the dashboard.
3. Create verification questions.
4. Upload a document and create at least one final wish or future message.
5. Open `/claim` and submit a claim as the successor.
6. Log in as an admin user.
7. Review the claim from the admin area.
8. Approve the claim and check successor vault access from `/vault-access`.

## Useful Scripts

Frontend:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

Backend:

```bash
npm run dev
npm start
```

## Troubleshooting

**Firebase Admin service account error**

Make sure `server/firebase/serviceAccountKey.json` exists. The backend imports this file from `src/config/firebase.js`.

**Frontend cannot reach backend**

Confirm the backend is running on `http://localhost:5000` and `client/.env` has `VITE_API_URL=http://localhost:5000/api/v1`.

**CORS error**

Confirm `CLIENT_URL` in `server/.env` matches the frontend origin, usually `http://localhost:5173`.

**MongoDB connection error**

Confirm `DATABASE_URL` is set to a valid MongoDB connection string and the database is reachable from your machine.

**Cloudinary upload error**

Confirm all Cloudinary variables are set in `server/.env`: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

## Documentation

- [Frontend README](client/README.md)
- [Backend README](server/README.md)

## Future Improvements

- Email or notification delivery for claim status changes
- Multi-successor support with priority levels
- Scheduled reminders for users to update vault contents
- Two-factor authentication for high-risk actions
- More detailed admin analytics
- Stronger document review and verification workflows
- Automated tests for API services and route guards
- Deployment guides for the client and server

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
