import { db } from "../db.js";
import { User } from "./User.js";
import { Room } from "./Room.js";
import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

export const Allocation = db.define("Allocation", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  fkUser: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  fkRoom: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
    updatedAt: false
});

Allocation.belongsTo(User, {
  foreignKey: "fkUser"
});
Allocation.belongsTo(Room, {
  foreignKey: "fkRoom"
});
User.hasOne(Allocation, {
  foreignKey: "fkUser",
  onDelete: "CASCADE"
});
Room.hasOne(Allocation, {
  foreignKey: "fkRoom",
  onDelete: "CASCADE"
});