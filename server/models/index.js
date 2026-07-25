import sequelize from "../config/database.js";

import User from "./User.js";
import Profile from "./Profile.js";
import Medicine from "./Medicine.js";
import HealthLog from "./HealthLog.js";
import Doctor from "./Doctor.js";
import Prescription from "./Prescription.js";

User.hasOne(Profile, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Profile.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Medicine, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Medicine.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(HealthLog, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

HealthLog.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Doctor, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Doctor.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Prescription, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Prescription.belongsTo(User, {
  foreignKey: "userId",
});

export {
  sequelize,
  User,
  Profile,
  Medicine,
  HealthLog,
  Doctor,
  Prescription,
};