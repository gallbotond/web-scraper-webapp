import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    value: { type: String, required: true },
    date_created: {
        type: Date,
        required: true,
        default: () => Date.now(),
        immutable: true,
    },
});

export const Token = mongoose.model("Token", tokenSchema);
