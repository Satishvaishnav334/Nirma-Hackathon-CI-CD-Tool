import express from 'express';
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config({
  path:"./.env"
})
const app = express();

const corsOptions = {
  origin: process.env.ACCESS_CONTROL_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.options('*', cors());
app.use(cors({
  origin:''
}))

import testingRouter from "./routes/testingRoute.js"

app.use("/api", testingRouter)

export default app;