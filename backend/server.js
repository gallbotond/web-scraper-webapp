import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { ACCESS_TOKEN_SECRET, MONGO_URI, SERVER_PORT } from "./config.js";

import indexRouter from "./routes/indexRoute.js";
import itemRoute from "./routes/itemRoute.js";

const app = express();
// const indexRouter = require("./routes/index");

app.use(express.json()); // middleware for parsing JSON
app.use(cors()); // middleware for enabling CORS

app.use("/", indexRouter);

// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

app.use("/items", itemRoute);

const items = [
    { email: "test@email.test", text: "item 1" },
    { email: "amog@us.sus", text: "amogs 1" },
    { email: "amog@us.sus", text: "item xdd" },
];

app.post("/items", authenticateToken, (req, res) => {
    res.json(items.filter((item) => item.email === req.user.email));
});

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

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
