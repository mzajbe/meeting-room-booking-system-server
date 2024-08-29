
import { User } from "../user/user.model";
import { TLoginUsr } from "./auth.interface";
import AppError from "../../error/AppError";
import httpStatus from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: TLoginUsr) => {
    
    
  //checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    // Handle the case where the user does not exist
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  //check if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched !");
  }

  //create token and sent to the client

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  return {
    accessToken,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      address: user.address,
    },
  };
};

export const AuthServices = {
  loginUser,
};
