import express from "express";
import cors from "cors";
import { ensureDbConnection } from "./db.js";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DB_DATABASE);

async function main() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  
  app.use("/docs", express.static("../docs"));
  
  app.get("/check", (req, res) => {
    res.send("API is up and running!");
  });
  
  await ensureDbConnection();

  app.listen(80, () => {
    console.log("API up!");
  });
}

main();


