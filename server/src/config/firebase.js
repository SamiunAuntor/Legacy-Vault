const { initializeApp, cert, getApps } = require("firebase-admin/app");
const fs = require("fs");
const path = require("path");

function getServiceAccount() {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
        try {
            const json = Buffer.from(
                process.env.FIREBASE_SERVICE_ACCOUNT_BASE64.trim(),
                "base64"
            ).toString("utf8");
            return JSON.parse(json);
        } catch {
            throw new Error("FIREBASE_SERVICE_ACCOUNT_BASE64 is not valid base64-encoded JSON");
        }
    }

    const directCredentials = [
        "FIREBASE_PROJECT_ID",
        "FIREBASE_CLIENT_EMAIL",
        "FIREBASE_PRIVATE_KEY",
    ];

    if (directCredentials.every((name) => process.env[name])) {
        return {
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        };
    }

    const localServiceAccountPath = path.resolve(
        __dirname,
        "../../firebase/serviceAccountKey.json"
    );

    if (fs.existsSync(localServiceAccountPath)) {
        return JSON.parse(fs.readFileSync(localServiceAccountPath, "utf8"));
    }

    throw new Error(
        "Firebase Admin credentials are missing. Set FIREBASE_SERVICE_ACCOUNT_BASE64, " +
        "set FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY, or add " +
        "firebase/serviceAccountKey.json for local development."
    );
}

const app = getApps()[0] || initializeApp({
    credential: cert(getServiceAccount()),
});

module.exports = app;
