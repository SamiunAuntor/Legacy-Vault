const mongoose = require("mongoose");

const futureMessageSchema =
    new mongoose.Schema(
        {
            ownerId: {
                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "User",

                required: true,
            },

            title: {
                type: String,

                required: true,

                trim: true,
            },

            messageType: {
                type: String,

                enum: [
                    "TEXT",
                    "AUDIO",
                    "VIDEO",
                ],

                default: "TEXT",
            },

            content: {
                type: String,
            },

            fileUrl: {
                type: String,
            },

            isReleased: {
                type: Boolean,

                default: false,
            },

            releasedAt: {
                type: Date,
            },
        },
        {
            timestamps: true,
        }
    );

module.exports = mongoose.model(
    "FutureMessage",
    futureMessageSchema
);