import mongoose from "mongoose";

var Schema = mongoose.Schema;

const JobApplicationModelSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  contacts: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
        },
        role: {
          type: String,
        },
        met: {
          type: String,
        },
      },
    ],
    required: true,
  },
  jobPosting: {
    type: String,
  },
  dateApplied: {
    type: String,
  },
  lastContactDate: {
    type: String,
  },
  notes: {
    type: String,
  },
});

export default mongoose.model("JobApplication", JobApplicationModelSchema);
