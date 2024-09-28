import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RoomService } from "./room.service";
import httpStatus from 'http-status-codes';


const createRoom = catchAsync(async (req,res)=>{
    const result = await RoomService.createRoomIntoDB(req.body);
    console.log(result);
    

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room added successfully',
        data: result,
      });
})

const getSingleRoom = catchAsync(async (req,res)=>{
    const {id} = req.params;
    const result = await RoomService.getSingleRoomFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room retrieved successfully',
        data: result,
      });
})

const getAllRoom = catchAsync (async (req,res) => {
    console.log('test',req.cookies);
    
    const result = await RoomService.getAllRoomFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rooms retrieved successfully',
        data: result,
      });
})

const updateRoom = catchAsync (async (req,res) => {
    const {id} = req.params;
    const result = await RoomService.updateRoomFromDB(id,req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room updated successfully',
        data: result,
      });
})

const softDeleteRoom = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RoomService.softDeleteRoomFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room deleted successfully',
      data: result,
    });
  });

export const RoomControllers = {
    createRoom,
    getSingleRoom,
    getAllRoom,
    updateRoom,
    softDeleteRoom
}