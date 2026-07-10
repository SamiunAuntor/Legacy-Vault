const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const routes = require("./routes");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

const configuredOrigins = [process.env.CLIENT_URL, process.env.CLIENT_URLS]
    .filter(Boolean)
    .join(",")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

const allowedOrigins = new Set([
    "http://localhost:5173",
    ...configuredOrigins,
]);

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow Postman and server-to-server requests
            if (!origin) return callback(null, true);

            if (allowedOrigins.has(origin.replace(/\/$/, ""))) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/v1", routes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "LegacyVault API Running",
    });
});

module.exports = app;
