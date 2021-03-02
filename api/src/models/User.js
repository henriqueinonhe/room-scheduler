import { Sequelize, DataTypes } from "sequelize";
import { db } from "../db.js";

export const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false 
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM(["admin", "common"]),
    allowNull: false
  }
}, {
  updatedAt: false
});