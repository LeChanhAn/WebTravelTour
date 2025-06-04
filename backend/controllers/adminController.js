import Tour from "../models/Tour.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

// Get all users (excluding admins)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      message: "Successfully retrived users",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get users",
    });
  }
};

// Get all users (include admin)
export const getAllUsersIncludingAdmins = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      message: "Successfully retrieved all users",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get all users",
    });
  }
};

// Get single user details
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully retrieved user",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get user",
    });
  }
};

// Delete user (only regular users, not admins)
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Cannot delete admin users",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalTours = await Tour.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalRevenue = await Booking.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalTours,
        totalBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get dashboard stats",
    });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("userId", "username email")
      .populate("tourId", "title price");

    res.status(200).json({
      success: true,
      count: bookings.length,
      message: "Successfully retrieved bookings",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get bookings",
    });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  const id = req.params.id;

  try {
    await Booking.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
    });
  }
};

// Get all tours for admin
export const getAllToursAdmin = async (req, res) => {
  try {
    const tours = await Tour.find({});

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get tours",
    });
  }
};

// Delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete tour",
    });
  }
};
