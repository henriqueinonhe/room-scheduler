import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { wait } from "./helpers/wait.js";

dotenv.config();

export const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql"
  },
);

export async function ensureDbConnection() {
  try {
    await db.authenticate();
  }
  catch(error) {
    console.log(error);
    console.log("Retrying connection to DB");
    await wait(1000);
    await ensureDbConnection();
  }
}

