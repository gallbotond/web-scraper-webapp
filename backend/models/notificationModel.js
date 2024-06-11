import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    notification_id: mongoose.Types.ObjectId(),
    message: "Welcome to the app!",
    date: new Date().toISOString(),
});

export const Notification = mongoose.model("Notification", notificationSchema);