import mongoose from "mongoose";

var Schema = mongoose.Schema;
const UserModelSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  jobApplications: [{ type: Schema.Types.ObjectId, ref: "JobApplication" }],
});

export default mongoose.model("UserModel", UserModelSchema);
