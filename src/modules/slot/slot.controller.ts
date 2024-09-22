
import catchAsync from "../../utils/catchAsync";
import {  SlotService } from "./slot.service";

export const createSlotController = catchAsync (async (req, res) => {
    try {
        const { room, date, startTime, endTime } = req.body;

        if (!room || !date || !startTime || !endTime) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: room, date, startTime, and endTime.'
            });
        }

        const slots = await SlotService.createSlots(room, date, startTime, endTime);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Slots created successfully',
            data: slots
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
});


export const getAvailableSlots = catchAsync (async (req, res) => {
    try {
        const { date, roomId } = req.query;

        // Use arrow function from SlotService
        const availableSlots = await SlotService.getAvailableSlots(date as string, roomId as string);

        // const getAvailableSlots = await SlotService.getAvailableSlots
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Available slots retrieved successfully",
            data: availableSlots,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to retrieve available slots here",
        });
    }
});

