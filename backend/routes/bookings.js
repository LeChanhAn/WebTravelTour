import express from "express";
import {
  createBooking,
  getBooking,
  getUserBookings,
  deleteUserBooking,
  updateUserBooking,
} from "../controllers/bookingController.js";

import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Create user booking
router.post("/", verifyUser, createBooking);
// Get user's own bookings
router.get("/user", verifyUser, getUserBookings); 
// Get single booking
router.get("/:id", verifyUser, getBooking); 
// Update user's own booking
router.put("/:id", verifyUser, updateUserBooking); 
// Cancel user's own booking
router.delete("/:id", verifyUser, deleteUserBooking); 

export default router;
