import AppError from "../../error/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Booking } from "./bookings.model";
import { BookingService } from "./bookings.service";
import httpStatus from "http-status-codes";

const createBooking = catchAsync(async (req, res) => {
  const { date, slots, room, user } = req.body;
  // console.log("Received booking request:", req.body);
  // Call the booking service to create a booking

   // Validate that room and user are not undefined
   if (!room || !user) {
    return res.status(400).json({
      success: false,
      message: "Room and user are required for booking",
    });
  }

  const newBooking = await BookingService.createBooking(
    date,
    slots,
    room,
    user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "booking created successfully",
    data: newBooking,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  // Fetch all bookings from service
  const bookings = await BookingService.getBookings();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: bookings,
  });

  // res.status(200).json({
  //     success: true,
  //     statusCode: 200,
  //     message: "All bookings retrieved successfully",
  //     data: bookings,
  // });
});

const getUserBookings = catchAsync(async (req, res) => {
  try {
    console.log("req.user in getUserBookings:", req.user); // Log req.user

    if (!req.user) {
      console.error("req.user is undefined in getUserBookings");
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Assuming you have userId from authentication middleware (e.g., JWT token)
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not provided",
      });
    }

    // Fetch user's bookings and populate room and slots
    const userBookings = await Booking.find({ user: userId })
      .populate({
        path: "slots", // Populate the slots with relevant details
        select: "startTime endTime isBooked date room", // Specify the fields you want to return
        populate: {
          path: "room",
          select:
            "name roomNo floorNo capacity pricePerSlot amenities isDeleted",
        }, // Populate room inside slots
      })
      .populate(
        "room",
        "name roomNo floorNo capacity pricePerSlot amenities isDeleted"
      ) // Populate room details
      .populate("user", "name email"); // You can choose to populate user details if needed

    console.log("Found bookings:", userBookings.length);

    // If no bookings found
    if (!userBookings.length) {
      return res.status(404).json({
        success: false,
        message: "No bookings found for this user",
      });
    }

    // Send the response
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User bookings retrieved successfully",
      data: userBookings,
    });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while retrieving user bookings",
    });
  }
});

const updateBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { isConfirmed } = req.body;

  // Find the booking by ID
  const booking = await Booking.findById(id)
    .populate("room") // Populate room details
    .populate("user") // Populate user details
    .populate("slots"); // Populate slot details

  if (!booking) {
    return next(new AppError(httpStatus.NOT_FOUND, "Booking not found"));
  }

  // Update the booking confirmation status
  booking.isConfirmed = isConfirmed || booking.isConfirmed;

  // Save the updated booking
  const updatedBooking = await booking.save();

  // Send the response with updated booking details
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking updated successfully",
    data: updatedBooking,
  });
});


const getBookingsByUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  // Find bookings that belong to the user
  const bookings = await Booking.find({ user: userId })
    .populate("room") // Populate room details
    .populate("slots"); // Populate slot details

  if (!bookings) {
    return next(new AppError(httpStatus.NOT_FOUND, "No bookings found"));
  }

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    data: bookings,
  });
});





const rejectBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  // const { isConfirmed } = req.body;

  // Find the booking by ID
  const booking = await Booking.findById(id)
    .populate("room") // Populate room details
    .populate("user") // Populate user details
    .populate("slots"); // Populate slot details

  if (!booking) {
    return next(new AppError(httpStatus.NOT_FOUND, "Booking not found"));
  }

  // Update the booking confirmation status to "unconfirmed" if it was "confirmed"
  booking.isConfirmed = booking.isConfirmed === "confirmed" ? "unconfirmed" : booking.isConfirmed;

  // Save the updated booking
  const updatedBooking = await booking.save();

  // Send the response with updated booking details
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking rejected successfully",
    data: updatedBooking,
  });
});

// Controller for soft deleting the booking
export const deleteBooking = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    // Find the booking by ID
    const booking = await Booking.findById(id)
      .populate('room') // Populate room details
      .populate('user') // Populate user details
      .populate('slots'); // Populate slot details

    if (!booking) {
      return next(new AppError(httpStatus.NOT_FOUND, 'Booking not found'));
    }

    // Soft delete the booking by setting `isDeleted` to true
    booking.isDeleted = true;

    // Save the updated booking
    const deletedBooking = await booking.save();

    // Send the response with the soft-deleted booking details
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking deleted successfully',
      data: deletedBooking,
    });
  }
);

export const bookingController = {
  createBooking,
  getAllBookings,
  getUserBookings,
  getBookingsByUser,
  updateBooking,
  rejectBooking,
  deleteBooking
};
