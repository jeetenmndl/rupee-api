import mongoose from "mongoose";

const kycSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  userID: { 
    type: String, 
    required: true 
  },
  idType: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
    trim: true
  },
  idPhoto: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const Kyc =
  mongoose.models.Kyc || mongoose.model("Kyc", kycSchema);

export default Kyc;
