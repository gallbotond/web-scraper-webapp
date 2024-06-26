import express from "express";

import { Item } from "../models/itemModel.js";

import authenticateToken from "../middleware/tokenMiddleware.js";

const router = express.Router();

// route to get all items
router.get("/", authenticateToken, async (req, res) => {
    //   res.send("Get all items");
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.error("Error getting items", error);
    }
});

// route to get a single item
router.get("/:id", (req, res) => {
    //   res.send("Get a single item");
    const id = req.params.id;
    Item.findById(id)
        .then((item) => {
            res.status(200).json(item);
        })
        .catch((error) => {
            console.error("Error getting item", error);
        });
});

export default router;
