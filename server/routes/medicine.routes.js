import express from "express";
import Medicine from "../models/Medicine.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/*
Get medicines
*/
router.get("/", auth, async (req, res) => {
  try {
    const meds = await Medicine.findAll({
      where: {
        userId: req.userId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(meds);
  } catch {
    res.status(500).json({
      message: "Failed to fetch medicines",
    });
  }
});

/*
Create medicine
*/
router.post("/", auth, async (req, res) => {
  try {
    const med = await Medicine.create({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json(med);
  } catch {
    res.status(400).json({
      message: "Failed to create medicine",
    });
  }
});

/*
Update medicine
*/
router.put("/:id", auth, async (req, res) => {
  try {
    const med = await Medicine.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });

    if (!med) {
      return res.sendStatus(404);
    }

    await med.update(req.body);

    res.sendStatus(200);
  } catch {
    res.status(400).json({
      message: "Failed to update medicine",
    });
  }
});

/*
Delete medicine
*/
router.delete("/:id", auth, async (req, res) => {
  try {
    const med = await Medicine.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });

    if (!med) {
      return res.sendStatus(404);
    }

    await med.destroy();

    res.sendStatus(204);
  } catch {
    res.status(400).json({
      message: "Failed to delete medicine",
    });
  }
});

export default router;