import mongoose from "mongoose";

const settlementSchema = new mongoose.Schema({
  projectID: {
    type: String,
    trim: true,
    required: true,
  },
  totalAmount:{
    type: String,
    required: true,
  },
  status:{
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Settlement =
  mongoose.models.Settlement || mongoose.model("Settlement", settlementSchema);

export default Settlement;
