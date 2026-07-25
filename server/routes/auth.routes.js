import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";

dotenv.config();

const router = express.Router();

/*
Signup
*/
router.post("/signup", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashed,
    });

    const { password, ...userData } = user.toJSON();

    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

/*
Login
*/
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.sendStatus(401);
    }

    const ok = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!ok) {
      return res.sendStatus(401);
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET
    );

    const { password, ...userData } = user.toJSON();

    res.json({
      token,
      user: userData,
    });
  } catch {
    res.sendStatus(500);
  }
});

export default router;