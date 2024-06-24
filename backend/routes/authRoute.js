import brcypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

import { Token } from "../models/tokenModel.js";
import { User } from "../models/userModel.js";

import { REFRESH_TOKEN_SECRET } from "../config.js";

import { generateRefreshToken, generateToken } from "../helper/tokenHelper.js";

const router = express.Router();

// route to login a user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Cannot find user");
        }
        if (await brcypt.compare(password, user.password)) {
            const accessToken = generateToken(email);
            const refreshToken = generateRefreshToken(email);
            const newToken = new Token({ value: refreshToken });
            const addedToken = await newToken.save();
            console.log(addedToken);
            res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
            console.log("Login successful");
        } else {
            res.status(400).send("Login failed");
        }
    } catch (error) {
        console.error("Login error", error);
        res.status(500).send(error);
    }
});

// log off a user by deleting refresh token
router.delete("/logout", async (req, res) => {
    const value = req.body.value;
    // console.log(value);
    try {
        if (!value) {
            return res.status(401).send("Invalid token provided");
        }
        const deletedToken = await Token.findOneAndDelete({ value: value });
        res.status(204).send("Token deleted");
    } catch (error) {
        console.error("Logout error", error);
        res.status(500).send(error);
    }
});

// route to get new access token with refresh token
router.post("/token", async (req, res) => {
    const refreshToken = req.body.token;
    try {
        if (!refreshToken) {
            return res.status(401).send("Invalid token provided");
        }
        const token = await Token.findOne({ value: refreshToken });
        if (!token) {
            return res.status(403).send("Token not found");
        }
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send("Token verification failed");
            }
            const accessToken = generateToken(user.email);
            res.status(200).json({ accessToken: accessToken });
        });
    } catch (error) {
        console.error("Token error", error);
        res.status(500).send(error);
    }
});

export default router;
