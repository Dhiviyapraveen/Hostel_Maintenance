import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomNo: { type: String, required: true },
  category: {
    type: String,
    enum: ["Carpentry", "Plumbing", "Electrical", "Housekeeping", "Network", "General"],
    required: true,
  },
  description: { type: String, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const Issue = mongoose.models.Issue || mongoose.model("Issue", issueSchema);
export default Issue;

