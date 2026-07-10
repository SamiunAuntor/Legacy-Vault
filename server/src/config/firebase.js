const { initializeApp, cert } = require("firebase-admin/app");

const serviceAccount = require("../../firebase/serviceAccountKey.json");

const app = initializeApp({
    credential: cert(serviceAccount),
});

module.exports = app;
