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
} from "../controllers/tourController.js";

const router = express.Router();

// create new tour
router.post("/", createTour);
// update new tour
router.put("/:id", updateTour);
// delete tour
router.delete("/:id", deleteTour);
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
