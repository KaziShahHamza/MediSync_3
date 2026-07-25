import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const HealthLog = sequelize.define(
  "HealthLog",
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

    type: {
      type: DataTypes.ENUM(
        "bp",
        "diabetes",
        "bmi"
      ),
      allowNull: false,
    },

    High: DataTypes.FLOAT,

    Low: DataTypes.FLOAT,

    glucose: DataTypes.FLOAT,

    height: DataTypes.FLOAT,

    weight: DataTypes.FLOAT,

    bmi: DataTypes.FLOAT,

    note: DataTypes.TEXT,
  },
  {
    timestamps: true,
  }
);

export default HealthLog;