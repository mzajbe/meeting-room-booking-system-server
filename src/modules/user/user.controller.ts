import { Request, Response, NextFunction } from "express";
import { UserServices } from "./user.service";
import { userValidationSchema } from "./user.validation";
import httpStatus from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { User } from "./user.model";
import AppError from "../../error/AppError";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the incoming data
    const validatedData = userValidationSchema.parse(req.body);

    // Create a new user
    const result = await UserServices.createUser(validatedData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getAdmin = catchAsync(async (req, res) => {
  const admins = await UserServices.getUsersByRole("admin");

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins are retrieved successfully",
    data: admins,
  });
});

const getSingleUser = catchAsync(async (req,res)=>{
  const {id} = req.params;
  const result = await UserServices.getSingleUserFromDB(id);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single User retrieved successfully',
      data: result,
    });
})

const getUserByEmail = catchAsync(async (req, res, next) => {
  const { email } = req.params;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError(httpStatus.NOT_FOUND, "User not found"));
  }

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User fetched successfully",
    data: user,
  });
});

// Promote user to admin
const promoteToAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError(httpStatus.NOT_FOUND, "User not found"));
  }

  // Promote user to admin
  user.role = "admin";
  await user.save();

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User promoted to admin successfully",
    data: user,
  });
});

export const UserControllers = {
  signUp,
  getAdmin,
  getSingleUser,
  getUserByEmail,
  promoteToAdmin
  // createAdmin,
};
