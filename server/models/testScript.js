import mongoose from "mongoose";
const testScriptSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Name of the test case
  description: { type: String }, // Brief about what the test case does
  testType: { type: String, enum: ["UI", "API", "Integration", "Unit"], required: true }, // Type of test
  createdBy: { type: String, required: true }, // User who created the test case
  createdAt: { type: Date, default: Date.now }, // Timestamp when test case was created

  steps: [{ type: String, required: true }], // Steps to execute the test
  expectedResult: { type: String, required: true }, // Expected outcome
  status: { type: String, enum: ["Pending", "Running", "Passed", "Failed"], default: "Pending" }, // Test case execution status

  executionDetails: {
    executedAt: { type: Date }, // Timestamp of last execution
    executedBy: { type: String }, // User or system that executed the test
    actualResult: { type: String }, // Actual result of execution
    errorLogs: [{ type: String }], // Any errors encountered during execution
  },

  relatedRequirements: [{ type: String }], // Links to requirements or Figma design components
  automationScript: { type: String }, // Path or reference to an automation script (if applicable)
});

const TestScript = mongoose.model("TestScript", testScriptSchema);

export {TestScript};
