const fs = require("fs");
const path = require("path");
const { initializeApp, cert, getApps } = require("firebase-admin/app");

function getServiceAccount() {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
        try {
            const json = Buffer.from(
                process.env.FIREBASE_SERVICE_ACCOUNT_BASE64.trim(),
                "base64"
            ).toString("utf8");

            return JSON.parse(json);
        } catch (error) {
            throw new Error(
                `FIREBASE_SERVICE_ACCOUNT_BASE64 is invalid: ${error.message}`
            );
        }
    }

    const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
        ?.trim()
        .replace(/^['"]|['"]$/g, "")
        .replace(/\\n/g, "\n");

    if (projectId && clientEmail && privateKey) {
        return {
            project_id: projectId,
            client_email: clientEmail,
            private_key: privateKey,
        };
    }

    // Keep the gitignored JSON file as a local-development fallback only.
    const localPath = path.resolve(
        __dirname,
        "../../firebase/serviceAccountKey.json"
    );

    if (fs.existsSync(localPath)) {
        return JSON.parse(fs.readFileSync(localPath, "utf8"));
    }

    throw new Error(
        "Firebase Admin credentials are missing. Set FIREBASE_SERVICE_ACCOUNT_BASE64 or FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
    );
}

const app = getApps()[0] || initializeApp({
    credential: cert(getServiceAccount()),
});

module.exports = app;
