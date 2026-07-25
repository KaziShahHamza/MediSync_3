import express from "express";
import Prescription from "../models/Prescription.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/*
Get prescriptions
*/
router.get("/", auth, async (req, res) => {
  try {
    const prescriptions = await Prescription.findAll({
      where: {
        userId: req.userId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(prescriptions);
  } catch {
    res.status(500).json({
      message: "Failed to fetch prescriptions",
    });
  }
});

/*
Create prescription
*/
router.post("/", auth, async (req, res) => {
  try {
    const prescription = await Prescription.create({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json(prescription);
  } catch {
    res.status(400).json({
      message: "Failed to create prescription",
    });
  }
});

/*
Delete prescription
*/
router.delete("/:id", auth, async (req, res) => {
  try {
    const prescription = await Prescription.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });

    if (!prescription) {
      return res.status(404).json({
        message: "Prescription not found",
      });
    }

    await prescription.destroy();

    res.json({
      success: true,
    });
  } catch {
    res.status(400).json({
      message: "Failed to delete prescription",
    });
  }
});

export default router;