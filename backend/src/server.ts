import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({
  limit: '100kb'
}));
app.use(cors({
  credentials: true,
  origin: "*"
}));

import router from "./router/router";
app.use("/api/v1", router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server activated on port", PORT);
})