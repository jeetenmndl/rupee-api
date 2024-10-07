import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  websiteUrl: { 
    type: String, 
    trim: true 
  },
  userID: { 
    type: String, 
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "ready",
  },
  apiKey: {
    type: String,
    required: true,
    trim: true,
  },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
