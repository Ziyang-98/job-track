import mongoose from "mongoose";

var Schema = mongoose.Schema;
let UserModelSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  jobApplications: {
    type: [
      {
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
          required: true,
        },
        lastContactDate: {
          type: String,
        },
        notes: {
          type: String,
        },
      },
    ],
    required: true,
  },
});

export default mongoose.model("UserModel", UserModelSchema);
