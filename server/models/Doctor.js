import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Doctor = sequelize.define(
  "Doctor",
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

    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    designation: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    hospital: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    chamber: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    visitingDays: {
      type: DataTypes.JSON,
      defaultValue: [],
    },

    phone: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    notes: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
  },
  {
    timestamps: true,
  }
);

export default Doctor;