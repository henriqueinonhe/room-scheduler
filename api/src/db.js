import { Sequelize } from "sequelize";
import { wait } from "./helpers/wait.js";
import dotenv from "dotenv";

dotenv.config();

export const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: JSON.parse(process.env.DB_LOGGING)
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

