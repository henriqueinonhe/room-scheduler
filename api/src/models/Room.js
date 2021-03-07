import Sequelize from "sequelize";
import { db } from "../db.js";

const { DataTypes } = Sequelize;

export const Room = db.define("Room", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
    updatedAt: false
});