import express from "express";
import auth from "../middleware/auth.js";
import { HealthLog } from "../models/index.js";

const router = express.Router();

/*
Create health log
*/
router.post("/", auth, async (req, res) => {
  try {
    const log = await HealthLog.create({
      ...req.body,
      userId: req.userId,
    });

    res.json(log);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

/*
Get user health logs
*/
router.get("/", auth, async (req, res) => {
  try {
    const logs = await HealthLog.findAll({
      where: {
        userId: req.userId,
      },
      order: [["createdAt", "ASC"]],
    });

    res.json(logs);
  } catch {
    res.status(500).json({
      message: "Failed to fetch health logs",
    });
  }
});

/*
Delete health log
*/
router.delete("/:id", auth, async (req, res) => {
  try {
    const log = await HealthLog.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });

    if (!log) {
      return res.sendStatus(404);
    }

    await log.destroy();

    res.json({
      success: true,
    });
  } catch {
    res.status(400).json({
      message: "Failed to delete health log",
    });
  }
});

export default router;