import { DataTypes } from "sequelize";
import { db } from "../db.js";
import { User } from "./User.js";

export const Session = db.define("Session", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fkUser: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, {
    updatedAt: false
});

Session.belongsTo(User, {
  foreignKey: "fkUser"
});