import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  topics: {
    type: [String],  // Array of strings
    required: true,
  },
},{ timestamps: true });

const Training = mongoose.models.Training || mongoose.model("Training", trainingSchema);

export default Training;

