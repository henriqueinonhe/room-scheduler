import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/docs", express.static("../docs"));

app.get("/check", (req, res) => {
  res.send("API is up and running!");
});

app.listen(80, () => {
  console.log("API up!");
});

db.authenticate();