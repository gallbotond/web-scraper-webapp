import express from "express";

import { Token } from "../models/tokenModel.js";

const router = express.Router();

// route to check if the token is in the database
router.post("/validate", async (req, res) => {
    const { token } = req.body;
    try {
        const existingToken = await Token.find({ value: token });
        if (existingToken.length > 0) {
            return res.status(200).json({ message: "Token exists" });
        } else {
            return res.status(404).json({ message: "Token does not exist" });
        }
    } catch (error) {
        console.error("Token validation failed", error);
    }
});

// route to put token in the database
router.post("/", async (req, res) => {
    const tokenValue = req.body;
    try {
        const token = new Token({ value: tokenValue });
        const newToken = await token.save();
    } catch (error) {
        console.error("Error registering token", error);
        res.status(500).send(error);
    }
});

// route to delete token from the database
router.delete("/", async (req, res) => {
    const { value } = req.body;
    try {
        const deletedToken = Token.findOneAndDelete({ value: value });
        if (!deletedToken) {
            return res.status(404).send({ message: "Token not found" });
        }
        res.status(200).json(deletedToken);
    } catch (error) {
        console.error("Error deleting token", error);
        res.status(500).send({ message: "Error deleting token", error: error });
    }
});
