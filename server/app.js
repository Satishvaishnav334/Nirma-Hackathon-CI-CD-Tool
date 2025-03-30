import express from 'express';
import routes from './routes/healthRoute.js';
import cors from "cors";
import { figmarouter } from './routes/figmaroute.js';
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
app.use('/', routes);
app.use('/api/figma', figmarouter);
import router from "./routes/healthRoute.js"

app.use("/api/figma", router)

export default app;