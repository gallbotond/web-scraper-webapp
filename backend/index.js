import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MONGO_URI, PORT } from "./config.js";
import { Item } from "./models/itemModel.js";
import itemRoute from "./routes/itemRoute.js";

const app = express();

// middleware to parse json
app.use(express.json());
// middleware for CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/items", itemRoute);

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
