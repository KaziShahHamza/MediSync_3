import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import medicineRoutes from "./routes/medicine.routes.js";
import healthRoutes from "./routes/health.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import prescriptionRoutes from "./routes/prescription.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

import sequelize from "./config/database.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/medicines", medicineRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("MySQL connected.");

    /*
      Models will be synced after Prompt 2
      when all Mongoose models have been
      converted to Sequelize.
    */

    await sequelize.sync({ alter: true });

    console.log("Database synchronized.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
  }
}

startServer();