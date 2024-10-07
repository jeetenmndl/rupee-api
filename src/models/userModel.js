import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  photo: {
    type: String,
    required: true,
  },
  firstName: { type: String },
  lastName: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
