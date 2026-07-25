import express from "express";
import Doctor from "../models/Doctor.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/*
Get doctors
*/
router.get("/", auth, async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      where: {
        userId: req.userId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(doctors);
  } catch {
    res.status(500).json({
      message: "Failed to fetch doctors",
    });
  }
});

/*
Create doctor
*/
router.post("/", auth, async (req, res) => {
  try {
    const doctor = await Doctor.create({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json(doctor);
  } catch {
    res.status(400).json({
      message: "Failed to create doctor",
    });
  }
});

/*
Update doctor
*/
router.put("/:id", auth, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    await doctor.update(req.body);

    res.json(doctor);
  } catch {
    res.status(400).json({
      message: "Failed to update doctor",
    });
  }
});

/*
Delete doctor
*/
router.delete("/:id", auth, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    await doctor.destroy();

    res.json({
      success: true,
    });
  } catch {
    res.status(400).json({
      message: "Failed to delete doctor",
    });
  }
});

export default router;