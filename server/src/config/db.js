const mongoose = require("mongoose");

let connectionPromise;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is required");
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.DATABASE_URL)
            .then((mongooseInstance) => {
                console.log("MongoDB Connected");
                return mongooseInstance.connection;
            })
            .catch((error) => {
                connectionPromise = undefined;
                throw error;
            });
    }

    return connectionPromise;
};

module.exports = connectDB;
