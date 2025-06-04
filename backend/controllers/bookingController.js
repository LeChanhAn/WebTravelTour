import Booking from "../models/Booking.js";

// create new booking
export const createBooking = async (req, res) => {
  try {
    // Extract and validate required fields
    const { tourId, fullName, guestSize, phone, bookAt, totalPrice } = req.body;

    // Validate required fields
    if (!tourId || !fullName || !guestSize || !phone || !bookAt) {
      return res.status(400).json({
        success: false,
        message:
          "All required fields must be provided: tourId, fullName, guestSize, phone, bookAt",
      });
    }

    // Get userId from token (verifyUser middleware)
    const userId = req.user?.id;
    const userEmail = req.user?.email;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    // Calculate totalPrice if not provided
    let finalTotalPrice = totalPrice;
    if (!totalPrice) {
      return res.status(400).json({
        success: false,
        message: "totalPrice is required",
      });
    }

    // Validate booking date is in the future
    const bookingDate = new Date(bookAt);
    const currentDate = new Date();

    if (bookingDate <= currentDate) {
      return res.status(400).json({
        success: false,
        message: "Booking date must be in the future",
      });
    }

    // Validate guest size
    if (guestSize < 1) {
      return res.status(400).json({
        success: false,
        message: "Guest size must be at least 1",
      });
    } // Create booking object
    const bookingData = {
      userId,
      userEmail,
      tourId: tourId, // Now field name matches the data
      fullName,
      guestSize: Number(guestSize),
      phone: Number(phone),
      bookAt: bookingDate,
      totalPrice: Number(finalTotalPrice),
    };

    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save(); // Populate the saved booking with tour details
    const populatedBooking = await Booking.findById(savedBooking._id)
      .populate("tourId", "title price")
      .populate("userId", "username email");

    res.status(201).json({
      success: true,
      message: "Your tour is booked successfully",
      data: populatedBooking,
    });
  } catch (err) {
    console.error("Booking creation error:", err);

    // Handle specific MongoDB validation errors
    if (err.name === "ValidationError") {
      const errorMessage = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
      return res.status(400).json({
        success: false,
        message: `Validation error: ${errorMessage}`,
      });
    }

    // Handle cast errors (invalid ObjectId)
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid tour ID or user ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create booking. Please try again.",
    });
  }
};

// get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id; // from verifyUser middleware
  
  try {
    const book = await Booking.findById(id)
      .populate("tourId", "title price")
      .populate("userId", "username email");

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check if the booking belongs to the current user
    if (book.userId._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only access your own bookings",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully retrieved booking",
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve booking",
    });
  }
};

// get user's own bookings
export const getUserBookings = async (req, res) => {
  const userId = req.user.id; // from verifyUser middleware
  try {
    const bookings = await Booking.find({ userId })
      .populate("tourId", "title price")
      .populate("userId", "username email");

    res.status(200).json({
      success: true,
      count: bookings.length,
      message: "Successfully retrieved user bookings",
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
    });
  }
};

// delete user's own booking
export const deleteUserBooking = async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.id; // from verifyUser middleware

  try {
    // Find the booking first to verify ownership
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    } // Check if the booking belongs to the current user
    if (booking.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only cancel your own bookings",
      });
    }

    // Optional: Add business logic for cancellation rules
    // For example, check if booking can be cancelled based on tour date
    const tourDate = new Date(booking.bookAt);
    const currentDate = new Date();
    const timeDifference = tourDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Example: Don't allow cancellation if tour is within 24 hours
    if (daysDifference < 1) {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel booking. Tour is within 24 hours.",
      });
    }

    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
    });
  }
};

// update user's own booking
export const updateUserBooking = async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.id; // from verifyUser middleware
  const { guestSize, phone, bookAt } = req.body;

  try {
    // Find the booking first to verify ownership
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    } // Check if the booking belongs to the current user
    if (booking.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own bookings",
      });
    }

    // Prepare update data (only allow certain fields to be updated)
    const updateData = {};
    if (guestSize) updateData.guestSize = guestSize;
    if (phone) updateData.phone = phone;
    if (bookAt) {
      // Check if new date is in the future
      const newDate = new Date(bookAt);
      const currentDate = new Date();

      if (newDate <= currentDate) {
        return res.status(400).json({
          success: false,
          message: "Booking date must be in the future",
        });
      }
      updateData.bookAt = bookAt;
    }    // Update the booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: updateData },
      { new: true }
    )
      .populate("tourId", "title price")
      .populate("userId", "username email");

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update booking",
    });
  }
};
