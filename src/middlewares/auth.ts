import httpStatus from "http-status-codes";
import AppError from "../error/AppError";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../modules/user/user.interface";

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
      function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized!"
          );
        }
        // const {email,role} = decoded;

        const role = (decoded as JwtPayload).role;

        if (requiredRoles && requiredRoles.includes(role)) {
          throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
        }

        req.user = decoded as JwtPayload;
        next();
      }
    );
  });
};

export default auth;
