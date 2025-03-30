import mongoose from "mongoose";

const TestCaseSchema = new mongoose.Schema({
  title: String,
  description: String,
  steps: [String],
  expectedResult: String,
  status: { type: String, enum: ["pending", "running", "passed", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const TestCase = mongoose.model("TestCase", TestCaseSchema);
export default TestCase;