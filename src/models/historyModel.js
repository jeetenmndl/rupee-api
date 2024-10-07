import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  projectID: {
    type: String,
    trim: true,
    required: true,
  },
  transactions:{
    type: Array
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const History =
  mongoose.models.History || mongoose.model("History", historySchema);

export default History;
