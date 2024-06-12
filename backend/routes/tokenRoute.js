import express from "express";

import { Token } from "../models/tokenModel.js";

const router = express.Router();

// route to get all tokens
router.get("/", async (req, res) => {
    try {
        const tokens = await Token.find();
        res.status(200).json(tokens);
    } catch (error) {
        console.error("Error getting tokens", error);
    }
});

// route to get a single token by id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const token = await Token.findById(id);
        if (!token) {
            return res.status(404).send({ message: "Token not found" });
        }
        res.status(200).json(token);
    } catch (error) {
        console.error("Error getting token", error);
    }
});

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
    const { value } = req.body;
    console.log(value);
    try {
        const token = new Token({ value: value });
        const newToken = await token.save();
        res.status(201).json(newToken);
    } catch (error) {
        console.error("Error registering token", error);
        res.status(500).send(error);
    }
});

// delete token by id
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedToken = await Token.findByIdAndDelete(id);
        if (!deletedToken) {
            return res.status(404).send({ message: "Token not found" });
        }
        res.status(200).json(deletedToken);
    } catch (error) {
        console.error("Error deleting token", error);
        res.status(500).send({ message: "Error deleting token", error: error });
    }
});

// route to delete token by value
router.delete("/", async (req, res) => {
    const { value } = req.body;
    try {
        const deletedToken = await Token.findOneAndDelete({ value: value });
        if (!deletedToken) {
            return res.status(404).send({ message: "Token not found" });
        }
        res.status(200).json(deletedToken);
    } catch (error) {
        console.error("Error deleting token", error);
        res.status(500).send({ message: "Error deleting token", error: error });
    }
});

export default router;
