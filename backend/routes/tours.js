import express from "express";
import {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
  getTourBySlug,
} from "../controllers/tourController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create new tour
router.post("/", verifyAdmin, createTour);
// update new tour
router.put("/:id", verifyAdmin, updateTour);
// delete tour
router.delete("/:id", verifyAdmin, deleteTour);
// get tour by slug
router.get("/slug/:slug", getTourBySlug);
// get single tour
router.get("/:id", getSingleTour);
// get all tours
router.get("/", getAllTour);
// get tours by search
router.get("/search/getTourBySearch", getTourBySearch);
// get Featured tours
router.get("/search/getFeaturedTours", getFeaturedTour);
// get tours count
router.get("/search/getTourCount", getTourCount);
export default router;
