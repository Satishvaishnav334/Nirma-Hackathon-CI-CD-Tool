import { test, expect } from "@playwright/test";

test("Verify backend is running", async ({ request }) => {
  const response = await request.get("http://localhost:8000");
  expect(response.status()).toBe(200); // Expect 200 OK
});
