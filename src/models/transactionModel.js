import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

  totalAmount: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  transactionCode: { 
    type: String, 
    trim: true 
  },
  mobile: { 
    type: String ,
    required: true
  },
  vendor:{
    type: String,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now,
  },
  fee:{
    type: Number,
  },
  info:{
    type:Object,
  },
  uuid:{
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  projectID:{
    type: String,
    required: true,
  }
});

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;
