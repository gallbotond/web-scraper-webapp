import mongoose from "mongoose";

const ARRAY_LIMIT = 1000;
const ARRAY_LIMIT_MSG = "{PATH} exceeds the limit of " + ARRAY_LIMIT;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    date_created: {
        type: Date,
        required: true,
        default: () => Date.now(),
        immutable: true,
    },
    date_modified: { type: Date, required: true, default: () => Date.now() },
    collections: {
        type: [{ collection_id: { type: String, required: true } }],
        validate: [arrayLimit, ARRAY_LIMIT_MSG],
    },
    items: {
        type: [{ item_id: { type: String, required: true } }],
        validate: [arrayLimit, ARRAY_LIMIT_MSG],
    },
    // searches: {
    //     type: [
    //         {
    //             search_id: { type: String, required: true },
    //             search_term: { type: String, required: true },
    //         },
    //     ],
    //     validate: [arrayLimit, ARRAY_LIMIT_MSG],
    // },
    saved_filters: {
        type: [
            {
                filter_id: { type: String, required: true },
                filter_object: { type: Object, required: true },
            },
        ],
        validate: [arrayLimit, ARRAY_LIMIT_MSG],
    },
    // notifications: {
    //     type: [
    //         {
    //             notification_id: { type: String, required: true },
    //             message: { type: String, required: true },
    //             date: { type: String, required: true },
    //         },
    //     ],
    //     validate: [arrayLimit, ARRAY_LIMIT_MSG],
    // },
});

// These validators only work when mongoose create or save is called
// We should use User.findById().save() instead of User.findByIdAndUpdate
// because the latter skips validation
// Custom validator function for array length
function arrayLimit(val) {
    return val.length <= ARRAY_LIMIT;
}

// TODO: add custom validators for all fields

export const User = mongoose.model("User", userSchema);
