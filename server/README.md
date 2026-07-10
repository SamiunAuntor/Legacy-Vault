# LegacyVault Backend

The LegacyVault backend is a Node.js and Express API for secure digital inheritance workflows. It manages users, successors, verification questions, document uploads, final wishes, future messages, claims, admin review, and audit logs.

## What This API Does

- Verifies authenticated requests
- Stores vault owner, successor, claim, document, wish, and message data in MongoDB
- Uploads files and profile photos to Cloudinary
- Verifies Firebase-authenticated users with Firebase Admin
- Supports email/password auth through Firebase REST helpers
- Protects admin endpoints with role middleware
- Hashes verification answers before storing them
- Records important events in audit logs

## Tech Stack

- Node.js
- Express 5
- MongoDB + Mongoose
- Firebase Admin SDK
- Cloudinary
- Multer
- JWT
- bcryptjs
- Zod
- dotenv
- morgan
- cookie-parser
- cors

## Folder Structure

```text
src/
|-- config/        # Database, Firebase, Cloudinary, and Multer config
|-- constants/     # Shared constants such as roles
|-- middlewares/   # Auth, role, and error middleware
|-- modules/       # Feature modules
|   |-- admin/
|   |-- audit/
|   |-- auth/
|   |-- claim/
|   |-- document/
|   |-- finalWish/
|   |-- futureMessage/
|   |-- question/
|   |-- successor/
|   |-- user/
|-- routes/        # API route registration
|-- app.js         # Express app setup
|-- server.js      # Server bootstrap and MongoDB connection
```

Each module generally follows this pattern:

```text
moduleName/
|-- moduleName.route.js
|-- moduleName.controller.js
|-- moduleName.service.js
|-- moduleName.model.js
|-- moduleName.validation.js
```

Some modules do not need every file. For example, `audit` is model/service focused, while `user` currently provides the user model.

## Environment Variables

Create a `.env` file inside `server/`:

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

Variable notes:

- `PORT` controls the Express server port.
- `CLIENT_URL` is added to the CORS allowlist.
- `DATABASE_URL` must be a valid MongoDB connection string.
- `JWT_SECRET` is used by backend token flows.
- `FIREBASE_WEB_API_KEY` is used by Firebase REST auth helpers.
- `CLOUDINARY_*` variables are required for uploads.

Add the Firebase Admin SDK service account file at:

```text
server/firebase/serviceAccountKey.json
```

This file is required by `src/config/firebase.js` and should never be committed.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The API runs on:

```text
http://localhost:5000
```

The API base path is:

```text
http://localhost:5000/api/v1
```

## Production Start

```bash
npm start
```

## API Health Check

```http
GET /
```

Response:

```json
{
  "success": true,
  "message": "LegacyVault API Running"
}
```

## API Routes

All module routes are mounted under `/api/v1`.

### Auth

- `POST /auth/firebase-login`
- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/me`
- `PATCH /auth/me`
- `PATCH /auth/me/photo`

### Successors

- `POST /successors`
- `GET /successors/my-successor`
- `PATCH /successors`
- `DELETE /successors`
- `GET /successors/access`
- `GET /successors/vault`

### Verification Questions

- `POST /questions`
- `GET /questions`
- `DELETE /questions/:id`

### Documents

- `POST /documents`
- `GET /documents`
- `GET /documents/:id/open`
- `GET /documents/:id/download`
- `PATCH /documents/:id/status`
- `DELETE /documents/:id`

Document uploads use multipart form data with the field name `file`.

### Final Wishes

- `POST /final-wishes`
- `GET /final-wishes`
- `PATCH /final-wishes/:id`
- `DELETE /final-wishes/:id`

### Future Messages

- `POST /future-messages`
- `GET /future-messages`
- `PATCH /future-messages/:id`
- `DELETE /future-messages/:id`

### Claims

- `GET /claims/verification-questions`
- `GET /claims/mine`
- `POST /claims/submit`

### Admin

- `GET /admin/dashboard`
- `GET /admin/claims`
- `PATCH /admin/claims/:id/approve`
- `PATCH /admin/claims/:id/reject`
- `GET /admin/audit-logs`

## Authentication and Authorization

- Firebase-authenticated users can log in through `/auth/firebase-login`.
- Email/password login and registration are also exposed through backend auth routes.
- Protected routes use `Authorization: Bearer <token>`.
- Admin routes require the `ADMIN` role.
- Role constants are defined in `src/constants/roles.js`.
- Auth verification logic lives in `src/middlewares/auth.middleware.js`.
- Admin role checks are handled by `src/middlewares/role.middleware.js`.

## Data Models

### User

Stores user identity and account metadata:

- `name`
- `email`
- `firebaseUid`
- `photoURL`
- `photoPublicId`
- `role`: `USER` or `ADMIN`
- `isActive`

### Document

Stores vault document metadata:

- `ownerId`
- `documentName`
- `category`
- `fileSize`
- `fileExtension`
- `resourceType`
- `status`
- `fileUrl`
- `publicId`

Document categories:

- `IDENTITY`
- `FINANCIAL`
- `PROPERTY`
- `INSURANCE`
- `BUSINESS`
- `DIGITAL_ASSETS`

Document statuses:

- `VERIFIED`
- `ARCHIVED`
- `ACTION_REQUIRED`

### Successor

Stores trusted successor details:

- `ownerId`
- `fullName`
- `email`
- `phone`
- `nidNumber`
- `relationship`
- `isVerified`
- `vaultAccessGranted`
- `accessGrantedAt`
- `status`

Successor statuses:

- `PENDING`
- `ACTIVE`
- `CLAIMED`

### Verification Question

Stores owner questions and hashed answers:

- `ownerId`
- `question`
- `answerHash`

### Final Wish

Stores structured final wishes:

- `ownerId`
- `category`
- `title`
- `content`

Final wish categories:

- `PERSONAL`
- `FAMILY`
- `ASSET`
- `BUSINESS`
- `OTHER`

### Future Message

Stores delayed messages:

- `ownerId`
- `title`
- `messageType`
- `content`
- `fileUrl`
- `isReleased`
- `releasedAt`

Message types:

- `TEXT`
- `AUDIO`
- `VIDEO`

### Claim

Stores successor claim submissions and review state:

- `ownerId`
- `successorId`
- `claimantName`
- `claimantEmail`
- `claimantPhone`
- `claimantRelationship`
- `claimantNidNumber`
- `identityDocumentUrl`
- `score`
- `totalQuestions`
- `correctAnswers`
- `reviewedBy`
- `reviewedAt`
- `reviewNote`
- `status`

Claim statuses:

- `PENDING`
- `UNDER_REVIEW`
- `APPROVED`
- `REJECTED`

### Audit Log

Stores traceable security and workflow events:

- `actorId`
- `action`
- `entity`
- `entityId`
- `metadata`

## Claim Workflow

1. A user registers and creates their vault.
2. The user adds a successor, verification questions, documents, final wishes, and future messages.
3. A successor submits a claim and answers verification questions.
4. The system scores the verification answers.
5. The claim enters admin review.
6. An admin approves or rejects the claim.
7. Approved claims unlock released vault access for the successor.

## Security Notes

- Verification answers are hashed with bcrypt.
- Firebase Admin verifies Firebase-authenticated users.
- API routes use auth and role middleware where required.
- Uploaded files are handled through Multer and Cloudinary.
- Important events are recorded through audit logs.
- CORS allows local development and the configured `CLIENT_URL`.
- The Firebase Admin service account file is excluded from Git.

## Scripts

```bash
npm run dev   # Start with nodemon
npm start     # Start with node
```

## Troubleshooting

**Server crashes on Firebase config**

Confirm `server/firebase/serviceAccountKey.json` exists and contains a valid Firebase Admin service account.

**MongoDB connection fails**

Confirm `DATABASE_URL` is present in `server/.env` and the database is reachable.

**Uploads fail**

Confirm Cloudinary credentials are present and correct.

**CORS error from the browser**

Confirm `CLIENT_URL` matches the frontend origin exactly, including protocol and port.

**Admin routes return forbidden**

Confirm the authenticated user record has `role: "ADMIN"`.
