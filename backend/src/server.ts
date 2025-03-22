import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server activated on port", PORT);
})