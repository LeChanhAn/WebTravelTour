import User from "../models/User.js";
import bcrypt from "bcryptjs";

// create new User
export const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    const { password, ...userData } = savedUser._doc;

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: userData, // Return filtered data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
};

// update User
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { password, role, ...updateData } = req.body;

  try {
    // Do not allow role changes through regular user update
    let finalUpdateData = updateData;

    // Hash password if provided
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      finalUpdateData.password = bcrypt.hashSync(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: finalUpdateData },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

// delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    // Check if user is admin BEFORE deletion
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Cannot delete admin users",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

// getSingle User
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
      message: "Successfully retrieved",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user",
    });
  }
};
