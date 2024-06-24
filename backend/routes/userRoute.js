import brcypt from "bcrypt";
import express from "express";

import { User } from "../models/userModel.js";

import authenticateToken from "../middleware/tokenMiddleware.js";

const router = express.Router();

// route to get all users
router.get("/", authenticateToken, async (req, res) => {
    // res.send("Get all users");
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error getting users", error);
    }
});

// route to get user data
router.get("/:id", authenticateToken, (req, res) => {
    const id = req.params.id;
    // console.log("id")
    // console.log(id);
    User.findById(id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            res.status(200).json(user);
        })
        .catch((error) => {
            console.error("Error getting user " + id, error);
        });
});

// route to register a user
router.post("/", async (req, res) => {
    const { email, password, username } = req.body;

    try {
        // Check if email is already in use
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Email is already in use." });
        }

        // If email is not in use, proceed to create the user
        const user = new User({
            email,
            password: await brcypt.hash(password, 10),
            username,
            date_created: new Date().toISOString(),
            collections: [],
            items: [],
            searches: [],
            saved_filters: [],
            notifications: [],
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
        console.log("Registration successful");
    } catch (error) {
        console.error("Registration error", error);
        res.status(500).send(error);
    }
});

// route to update a user
router.put("/:id", authenticateToken, async (req, res) => {
    const { id } = req.params; // Extract the user ID from the request parameters
    const updateData = req.body; // Assuming all the update fields are in the request body

    try {
        // TODO: We should use User.findById().save() instead of User.findByIdAndUpdate
        // because the latter skips validation
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Update the user object with the new data
        updateUser(user, updateData);
        // Update other fields as needed

        const updatedUser = await user.save();
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
        ~console.log("User updated");
    } catch (error) {
        console.error("Error updating user", error);
        res.status(500).send(error);
    }
});

// route to delete a user
// TODO: delete tokens
router.delete("/:id", authenticateToken, async (req, res) => {
    const { id } = req.params; // Extract the user ID from the request params
    const { confirm } = req.body; // Extract the confirmation from the request body
    const username = await User.findById(id).username;
    // console.log(id)
    User.findByIdAndDelete(id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            if (confirm !== username) {
                return res.status(400).send({ message: "Confirmation failed" });
            }
            res.status(200).json(user);
            console.log(`Account ${username} deleted successfully`);
        })
        .catch((error) => {
            console.error("Account deletion error", error);
            res.status(500).send(error);
        });
});

function updateUser(user, updateData) {
    user.email = updateData.email;
    user.password = updateData.password;
    user.date_modified = new Date().toISOString();
    user.collections = updateData.collections;
    user.items = updateData.items;
    user.searches = updateData.searches;
    user.saved_filters = updateData.saved_filters;
    user.notifications = updateData.notifications;

    return user;
}

export default router;
