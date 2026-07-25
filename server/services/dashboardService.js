import {
  Profile,
  User,
  HealthLog,
  Medicine,
  Doctor,
  Prescription,
} from "../models/index.js";

import generateHealthSummary from "./healthSummaryService.js";

export async function getDashboardData(userId) {
  const profile = await Profile.findOne({
    where: {
      userId,
    },
    include: [
      {
        model: User,
        attributes: ["name", "email"],
      },
    ],
  });

  const latestBP = await HealthLog.findOne({
    where: {
      userId,
      type: "bp",
    },
    order: [["createdAt", "DESC"]],
  });

  const latestDiabetes = await HealthLog.findOne({
    where: {
      userId,
      type: "diabetes",
    },
    order: [["createdAt", "DESC"]],
  });

  const latestBMI = await HealthLog.findOne({
    where: {
      userId,
      type: "bmi",
    },
    order: [["createdAt", "DESC"]],
  });

  const medicineCount = await Medicine.count({
    where: {
      userId,
    },
  });

  const doctorCount = await Doctor.count({
    where: {
      userId,
    },
  });

  const prescriptionCount = await Prescription.count({
    where: {
      userId,
    },
  });

  const healthData = {
    bloodPressure: latestBP
      ? {
          high: latestBP.High,
          low: latestBP.Low,
          date: latestBP.createdAt,
        }
      : null,

    diabetes: latestDiabetes
      ? {
          glucose: latestDiabetes.glucose,
          date: latestDiabetes.createdAt,
        }
      : null,

    bmi: latestBMI
      ? {
          value: latestBMI.bmi,
          weight: latestBMI.weight,
          date: latestBMI.createdAt,
        }
      : null,

    profile: profile || null,
  };

  const healthSummary =
    generateHealthSummary(healthData);

  return {
    user: {
      name: profile?.User?.name || "User",
      email: profile?.User?.email || "",
    },

    health: {
      bloodPressure: healthData.bloodPressure,
      diabetes: healthData.diabetes,
      bmi: healthData.bmi,
    },

    healthSummary,

    summary: {
      medicines: medicineCount,
      doctors: doctorCount,
      prescriptions: prescriptionCount,
    },
  };
}