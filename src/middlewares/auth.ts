import httpStatus from "http-status-codes";
import AppError from "../error/AppError";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

// interface CustomRequest extends Request {
//   user: JwtPayload;
// }

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    // check if the token is valid

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      async function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized!"
          );
        }
        // const {email,role} = decoded;

        const role = (decoded as JwtPayload).role;

        if (requiredRoles.length && requiredRoles.includes(role)) {
          throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
        }

        req.user = decoded as JwtPayload;

        //testing on
        const userEmail = (decoded as JwtPayload).userEmail; // Assuming you store the email in the token
        const user = await User.findOne({ email: userEmail });
        if (!user) {
          throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
        }

        req.user = user;
        next();
      }
    );
  });
};

export default auth;
