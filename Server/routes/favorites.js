import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
// Middleware to authenticate and extract user from token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "improper access" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "improper access" });
  }
};
router.post("/add", authenticate, async (req, res) => {
  const { movie } = req.body;
  console.log("req.body:", req.body);

  try {
    if (!movie || !movie.id) {
      return res.status(400).json({ message: "Invalid movie data" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fix: handle if favorites contain nulls
    user.favorites = user.favorites.filter((f) => f !== null && f.id != null);

    if (!user.favorites.some((f) => f.id === movie.id)) {
      user.favorites.push(movie);
      await user.save();
    }

    res.status(200).json({
      message: "Movie added to favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Error in /favorites/add:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/remove", authenticate, async (req, res) => {
  const { movieId } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.favorites = user.favorites.filter((fav) => fav.id !== movieId);
    await user.save();

    res.status(200).json({
      message: "Movie removed from favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
