const mongoose = require("mongoose");

const TestCaseSchema = new mongoose.Schema({
  title: String,
  description: String,
  steps: [String],
  expectedResult: String,
  status: { type: String, enum: ["pending", "running", "passed", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TestCase", TestCaseSchema);
