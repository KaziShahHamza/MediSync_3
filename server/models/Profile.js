import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    dob: DataTypes.DATE,

    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: true,
    },

    height: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    bloodGroup: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    allergies: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },

    chronicIllnesses: {
      type: DataTypes.JSON,
      defaultValue: [],
    },

    surgeries: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },

    smoking: {
      type: DataTypes.ENUM("Never", "Former", "Current"),
      allowNull: true,
    },

    alcohol: {
      type: DataTypes.ENUM("Never", "Occasionally", "Frequently"),
      allowNull: true,
    },

    exercise: {
      type: DataTypes.ENUM(
        "Never",
        "1-2 Days",
        "3-5 Days",
        "Daily"
      ),
      allowNull: true,
    },

    diet: {
      type: DataTypes.ENUM(
        "Mixed",
        "Vegetarian",
        "Vegan"
      ),
      allowNull: true,
    },

    emergencyContact: {
      type: DataTypes.JSON,
      defaultValue: {
        name: "",
        phone: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Profile;