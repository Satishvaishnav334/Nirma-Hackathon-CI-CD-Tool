import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

const port = process.env.PORT || 8000;
dotenv.config({ path: './.env' });

import testRoutes from "./routes/testRoutes.js";
app.use("/api/testcases", testRoutes);


connectDB().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch((error) => {
  console.log("MongoDB connection failed: ", error);
});