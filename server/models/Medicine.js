import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Medicine = sequelize.define(
  "Medicine",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dosageTimes: {
      type: DataTypes.JSON,
      defaultValue: [],
    },

    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    timestamps: true,
  }
);

export default Medicine;