
import { Request, Response, NextFunction } from 'express';
import { UserServices } from './user.service';
import { userValidationSchema } from './user.validation';
import httpStatus from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the incoming data
    const validatedData = userValidationSchema.parse(req.body);

    // Create a new user
    const result = await UserServices.createUser(validatedData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  signUp,
};

