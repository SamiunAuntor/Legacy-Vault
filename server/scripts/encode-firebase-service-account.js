const fs = require("fs");
const path = require("path");

const serverRoot = path.resolve(__dirname, "..");
const serviceAccountPath = path.join(
    serverRoot,
    "firebase",
    "serviceAccountKey.json"
);
const envPath = path.join(serverRoot, ".env");

if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(`Service-account file not found: ${serviceAccountPath}`);
}

const serviceAccountText = fs.readFileSync(serviceAccountPath, "utf8");
const serviceAccount = JSON.parse(serviceAccountText);
const requiredKeys = ["project_id", "client_email", "private_key"];

if (requiredKeys.some((key) => !serviceAccount[key])) {
    throw new Error("The service-account JSON is missing required Firebase fields");
}

const encoded = Buffer.from(
    JSON.stringify(serviceAccount),
    "utf8"
).toString("base64");
const currentEnv = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
const clientEnvPath = path.resolve(serverRoot, "../client/.env");
const clientEnv = fs.existsSync(clientEnvPath)
    ? fs.readFileSync(clientEnvPath, "utf8")
    : "";
const webApiKey = clientEnv.match(/^VITE_FIREBASE_API_KEY=(.+)$/m)?.[1]
    ?.trim()
    .replace(/^['"]|['"]$/g, "");

function upsertEnv(source, name, value) {
    const entry = `${name}=${value}`;
    const pattern = new RegExp(`^${name}=.*$`, "m");

    return pattern.test(source)
        ? source.replace(pattern, entry)
        : `${source.trimEnd()}${source ? "\n" : ""}${entry}\n`;
}

let nextEnv = upsertEnv(
    currentEnv,
    "FIREBASE_SERVICE_ACCOUNT_BASE64",
    encoded
);

if (webApiKey) {
    nextEnv = upsertEnv(nextEnv, "FIREBASE_WEB_API_KEY", webApiKey);
}

fs.writeFileSync(envPath, nextEnv, "utf8");
console.log("Updated Firebase deployment credentials in server/.env");
