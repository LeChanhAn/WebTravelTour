import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  getAllUsersIncludingAdmins,
  deleteUser,
  getAllBookings,
  deleteBooking,
  getSingleUser,
} from "../controllers/adminController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Dashboard stats (protected)
router.get("/dashboard", verifyAdmin, getDashboardStats);

// User management (protected)

// Get regular users only
router.get("/users", verifyAdmin, getAllUsers);
// Get all users including admins
router.get("/users/all", verifyAdmin, getAllUsersIncludingAdmins); 
// Get single user
router.get("/users/:id", verifyAdmin, getSingleUser);
// Delete user
router.delete("/users/:id", verifyAdmin, deleteUser);

//Booking management (protected)

// Get all bookings
router.get("/bookings", verifyAdmin, getAllBookings);
// Delete booking
router.delete("/booking/:id", verifyAdmin, deleteBooking);

export default router;
