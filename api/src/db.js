import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env);

export const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
);