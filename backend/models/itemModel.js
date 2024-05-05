import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  price: [
    {
      value: { type: Number, required: true },
      date: { type: String, required: true },
    },
  ],
  url: { type: String, required: true },
  rating: { type: Number, required: false },
  num_reviews: { type: Number, required: false },
  img: { type: String, required: false },
  specs: { type: Array, required: false },
});

export const Item = mongoose.model("Item", itemSchema);
