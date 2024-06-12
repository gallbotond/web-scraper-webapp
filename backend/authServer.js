import brcypt from "bcrypt";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import tokenRoute from "./routes/tokenRoute.js";

import {
    ACCESS_TOKEN_SECRET,
    AUTH_SERVER_PORT,
    MONGO_URI,
    REFRESH_TOKEN_SECRET,
} from "./config.js";

const app = express();
// const indexRouter = require("./routes/index");

app.use(express.json()); // middleware for parsing JSON
app.use(cors()); // middleware for enabling CORS

app.use("/tokens", tokenRoute);

// const users = [
//     {
//         email: "testmail@mail.com",
//         password: await brcypt.hash("password", 10),
//         text: "Hello",
//     },
//     {
//         email: "amog@us.sus",
//         password: await brcypt.hash("impostor", 10),
//         text: "Among Us",
//     },
//     {
//         email: "test@email.test",
//         password: await brcypt.hash("123456", 10),
//         text: "Test",
//     },
// ];

// app.post("/users", async (req, res) => {
//     try {
//         const hashedPassword = await brcypt.hash(req.body.password, 10);
//         console.log(hashedPassword);
//         const user = { email: req.body.email, password: hashedPassword };
//         users.push(user);
//         res.status(201).json(users).send();
//     } catch {
//         res.status(500).send();
//     }
// });

// return all users
app.get("/users", (req, res) => {
    res.json(users);
});

let refreshTokens = [];

// get new access token with refresh token
app.post("/token", (req, res) => {
    const refreshToken = req.body.token;
    console.log(refreshToken);
    if (refreshToken == null) return res.sendStatus(401);
    console.log("not 401");
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    console.log("not 401 or 403");
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateToken({ email: user.email });
        res.json({ accessToken: accessToken });
    });
});

// log out user by deleting refresh token
app.delete("/logout", (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.sendStatus(204);
});

app.post("/users/login", async (req, res, next) => {
    // normal authentication process
    const user = users.find((user) => user.email === req.body.email);
    console.log(user);
    if (user == null) {
        return res.status(400).send("Cannot find user");
    }
    try {
        console.log("try");
        if (await brcypt.compare(req.body.password, user.password)) {
            // jwt authentication process
            const email = { email: req.body.email };
            const accessToken = generateToken(email);
            const refreshToken = jwt.sign(email, REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken);

            // return access token and refresh token
            res.json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
            res.send("Login failed");
        }
    } catch {
        res.status(500).send();
    }
});

function generateToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "25s" });
}

// app.listen(AUTH_SERVER_PORT, () => {
//     console.log(`Server running on port ${AUTH_SERVER_PORT}`);
// });

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(AUTH_SERVER_PORT, () => {
            console.log(`Server is running on port ${AUTH_SERVER_PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB", error);
    });
