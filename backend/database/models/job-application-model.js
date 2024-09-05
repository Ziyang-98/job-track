import mongoose from "mongoose";

var Schema = mongoose.Schema;

const JobApplicationModelSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
  datetimeLastUpdated: {
    type: String,
    required: true,
  },
  datetimeCreated: {
    type: String,
    required: true,
  },
});

export default mongoose.model("JobApplication", JobApplicationModelSchema);
