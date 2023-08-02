import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  votes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vote",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
