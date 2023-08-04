import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    text: {
      type: String,
    },
    productID: {
      type: String,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
