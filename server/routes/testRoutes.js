const express = require("express");
const router = express.Router();
const TestCase = require("../models/TestCase");

// Create a test case
router.post("/", async (req, res) => {
  const { title, description, steps, expectedResult } = req.body;
  const testCase = new TestCase({ title, description, steps, expectedResult });
  await testCase.save();
  res.json(testCase);
});

// Get all test cases
router.get("/", async (req, res) => {
  const testCases = await TestCase.find();
  res.json(testCases);
});

// Update test case status
router.put("/:id", async (req, res) => {
  const { status } = req.body;
  const testCase = await TestCase.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(testCase);
});

module.exports = router;
