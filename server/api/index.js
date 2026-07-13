require("dotenv").config();

module.exports = async function handler(req, res) {
    try {
        // Load deployment-sensitive modules inside the handler so configuration
        // failures produce a useful HTTP response instead of crashing the function.
        const app = require("../src/app");
        const connectDB = require("../src/config/db");

        await connectDB();
        return app(req, res);
    } catch (error) {
        console.error("Serverless initialization failed:", error);
        return res.status(500).json({
            success: false,
            message: "API initialization failed",
        });
    }
};
