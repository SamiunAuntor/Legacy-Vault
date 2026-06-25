# LegacyVault Backend

## Overview

LegacyVault is a MERN-based backend for a secure digital inheritance platform. It allows users to securely store important documents, create final wishes, assign a trusted successor, define custom verification questions, and transfer access after an admin-approved verification workflow.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Firebase Authentication (Admin SDK)
- Cloudinary
- Multer
- bcryptjs
- Zod
- dotenv

---

# Features

## Authentication
- Firebase Authentication
- Protected Routes
- Role-based Authorization
- User Registration on First Login

## User
- User Profile
- Role Management (USER, ADMIN)

## Successor
- Create Successor
- Update Successor
- Delete Successor
- View Successor
- Vault Access Status

## Verification Questions
- Custom Questions
- bcrypt Hashed Answers
- Secure Verification

## Document Vault
- Cloudinary Upload
- Categorized Documents
- Delete Documents
- Retrieve Documents

Categories:
- Identity
- Financial
- Property
- Insurance
- Business
- Digital Assets

## Final Wishes
- Create
- Update
- Delete
- Retrieve

Categories:
- Personal
- Family
- Asset
- Business
- Other

## Future Messages
- Text
- Audio
- Video
- Released after successful claim approval

## Legacy Claim System
- Submit Claim
- Upload Identity Document
- Answer Verification Questions
- Automatic Verification Score
- Under Review / Approved / Rejected

## Admin
- Dashboard
- Pending Claims
- Approve Claim
- Reject Claim
- Audit Logs

## Audit Logs
Tracks:
- Successor Created
- Question Created
- Document Uploaded
- Claim Submitted
- Claim Approved
- Claim Rejected

---

# Folder Structure

```text
src/
│
├── config/
├── constants/
├── middlewares/
├── modules/
│   ├── admin/
│   ├── audit/
│   ├── auth/
│   ├── claim/
│   ├── document/
│   ├── finalWish/
│   ├── futureMessage/
│   ├── question/
│   ├── successor/
│   └── user/
├── routes/
├── utils/
├── app.js
└── server.js
```

# Environment Variables

```env
PORT=5000
DATABASE_URL=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Firebase Admin SDK:

```
firebase/
└── serviceAccountKey.json
```

Add to `.gitignore`:

```gitignore
firebase/serviceAccountKey.json
.env
node_modules
```

# API Summary

## Auth
- POST /api/v1/auth/firebase-login
- GET /api/v1/auth/me

## Successor
- POST /api/v1/successors
- GET /api/v1/successors/my-successor
- PATCH /api/v1/successors
- DELETE /api/v1/successors
- GET /api/v1/successors/access

## Questions
- POST /api/v1/questions
- GET /api/v1/questions
- DELETE /api/v1/questions/:id

## Documents
- POST /api/v1/documents
- GET /api/v1/documents
- DELETE /api/v1/documents/:id

## Final Wishes
- POST /api/v1/final-wishes
- GET /api/v1/final-wishes
- PATCH /api/v1/final-wishes/:id
- DELETE /api/v1/final-wishes/:id

## Future Messages
- POST /api/v1/future-messages
- GET /api/v1/future-messages
- DELETE /api/v1/future-messages/:id

## Claims
- POST /api/v1/claims/submit

## Admin
- GET /api/v1/admin/dashboard
- GET /api/v1/admin/claims
- PATCH /api/v1/admin/claims/:id/approve
- PATCH /api/v1/admin/claims/:id/reject
- GET /api/v1/admin/audit-logs

# Claim Workflow

1. User registers via Firebase
2. User creates successor
3. User adds verification questions
4. User uploads documents
5. User writes final wishes
6. User creates future messages
7. Successor submits claim
8. System verifies answers
9. Claim enters UNDER_REVIEW
10. Admin approves claim
11. Vault access granted
12. Future messages released

# Security

- Firebase Authentication
- bcrypt hashed verification answers
- Cloudinary secure storage
- Protected routes
- Role-based authorization
- Audit logging

# Installation

```bash
npm install
npm run dev
```

# Future Improvements

- Notifications
- Email delivery
- Multi-successor support
- Two-factor authentication
- Scheduled reminders

# License

MIT License

# Author

Developed as the backend for the LegacyVault Hackathon Project.
