import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {  // e.g., Full-time, Part-time
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],  // Array of strings
    required: true,
  }
},{ timestamps: true });

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
