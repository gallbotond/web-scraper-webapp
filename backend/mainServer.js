import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { MONGO_URI, SERVER_PORT } from "./config.js";

import indexRouter from "./routes/indexRoute.js";
import itemRoute from "./routes/itemRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
// const indexRouter = require("./routes/index");

app.use(express.json()); // middleware for parsing JSON
app.use(cors()); // middleware for enabling CORS

app.use("/", indexRouter);
app.use("/items", itemRoute);
app.use("/users", userRoute);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(SERVER_PORT, () => {
            console.log(`Server is running on port ${SERVER_PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB", error);
    });
