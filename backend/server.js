import brcypt from "bcrypt";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { MONGO_URI, PORT } from "./config.js";

import indexRouter from "./routes/index.js";
import itemRoute from "./routes/itemRoute.js";

const app = express();
// const indexRouter = require("./routes/index");

// middleware to parse json
app.use(express.json());
// middleware for CORS
app.use(cors());
app.use("/", indexRouter);

// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

app.use("/items", itemRoute);

const users = [
    { email: "testmail@mail.com", password: "password" },
    { email: "amog@us.sus", password: "password" },
];
app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", async (req, res) => {
    try {
        const hashedPassword = await brcypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        const user = { email: req.body.email, password: hashedPassword };
        users.push(user);
        res.status(201).json(users).send();
    } catch {
        res.status(500).send();
    }
});

app.post("/users/login", async (req, res) => {
    const user = users.find((user) => user.email === req.body.email);
    if (user == null) {
        return res.status(400).send("Cannot find user");
    }
    try {
        if (await brcypt.compare(req.body.password, user.password)) {
            res.send("Success");
        } else {
            res.send("Not Allowed");
        }
    } catch {
        res.status(500).send();
    }
})

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB", error);
    });
