import express from "express";
import auth from "../middleware/auth.js";
import { Profile, User } from "../models/index.js";

const router = express.Router();

/*
Get profile
*/
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: {
        exclude: ["password"],
      },
    });

    const profile = await Profile.findOne({
      where: {
        userId: req.userId,
      },
    });

    res.json({
      user,
      profile: profile || null,
    });
  } catch {
    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
});

/*
Create profile
*/
router.post("/", auth, async (req, res) => {
  try {
    const exists = await Profile.findOne({
      where: {
        userId: req.userId,
      },
    });

    if (exists) {
      return res.status(400).json({
        message: "Profile already exists",
      });
    }

    const profile = await Profile.create({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

/*
Update profile
*/
router.put("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: {
        userId: req.userId,
      },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    await profile.update(req.body);

    res.json(profile);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

export default router;