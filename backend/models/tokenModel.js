import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    value: { type: String, required: true },
    date_created: {
        type: Date,
        required: true,
        default: () => Date.now(),
        immutable: true,
    },
});

export const Token = mongoose.model("Token", tokenSchema);
