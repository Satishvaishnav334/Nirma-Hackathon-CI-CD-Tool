import express from 'express';
import routes from './routes/healthRoute.js';
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
app.use('/', routes);

// routes
import healthRouter from "./routes/healthRoute.js"

app.use("/api/v1/users", healthRouter)

export default app;