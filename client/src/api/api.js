import axios from "axios";

const API_URL = "http://localhost:5000/api/testcases";

export const fetchTestCases = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTestCase = async (testCase) => {
  const response = await axios.post(API_URL, testCase);
  return response.data;
};

export const updateTestCaseStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}`, { status });
  return response.data;
};
