import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sequelize from "./config/database.js";
import "./models/index.js";

import authRoutes from "./routes/auth.routes.js";
import medicineRoutes from "./routes/medicine.routes.js";
import healthRoutes from "./routes/health.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import prescriptionRoutes from "./routes/prescription.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

import { startReminderScheduler } from "./services/reminderScheduler.js";


dotenv.config();


const app = express();


/*
Middleware
*/

app.use(cors());

app.use(express.json());



/*
Routes
*/

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

    /*
    Connect to MySQL
    */

    await sequelize.authenticate();

    console.log("MySQL connected successfully");



    /*
    Create / update tables

    Development:
    alter: true

    Production:
    use migrations instead
    */

    await sequelize.sync({
      alter: true,
    });


    console.log("Database synchronized");



    /*
    Start background services
    */

    startReminderScheduler();


    /*
    Start Express server
    */

    app.listen(PORT, () => {

      console.log(
        `Server running on port ${PORT}`
      );

    });


  } catch (error) {

    console.error(
      "Server startup failed:"
    );

    console.error(error);

    process.exit(1);

  }

}


startServer();