import { Request, Response, NextFunction } from "express";
import { UserServices } from "./user.service";
import { userValidationSchema } from "./user.validation";
import httpStatus from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

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

// const createAdmin = catchAsync(async (req, res) => {
//   const {password,admin:adminData} = req.body;

//   const result = await UserServices.createAdminIntoDB(password,adminData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin is created successfully',
//     data: result,
//   });
// });

export const UserControllers = {
  signUp,
  getAdmin,
  // createAdmin,
};
