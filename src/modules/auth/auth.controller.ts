import catchAsync from "../../utils/catchAsync";
import  { sendResponseLogin } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req,res)=>{

    const result = await AuthServices.loginUser(req.body);

    sendResponseLogin(res, {
        success: true,
        token:result.accessToken,
        message: 'User is logged in successfully!',
        statusCode:httpStatus.OK,
        data:result.data,
      });
});

export const AuthControllers = {
    loginUser,
}