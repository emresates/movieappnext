import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  id: {
    type: String,
  },
  type: {
    type: String,
  },
  votes: [{ type: Number, default: 0 }],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
