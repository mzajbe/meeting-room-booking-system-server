
import catchAsync from "../../utils/catchAsync";
import {  SlotService } from "./slot.service";

// export const createSlotController = catchAsync (async (req, res) => {
//     try {
//         const { room, date, startTime, endTime } = req.body;

//         if (!room || !date || !startTime || !endTime) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'All fields are required: room, date, startTime, and endTime.'
//             });
//         }

//         const slots = await SlotService.createSlots(room, date, startTime, endTime);

//         res.status(200).json({
//             success: true,
//             statusCode: 200,
//             message: 'Slots created successfully',
//             data: slots
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Server Error',
//             error: error.message
//         });
//     }
// });

export const createSlotController = catchAsync(async (req, res) => {
    const { room, date, startTime, endTime } = req.body;

    if (!room || !date || !startTime || !endTime) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required: room, date, startTime, and endTime.',
        });
    }

    try {
        const slots = await SlotService.createSlots(room, date, startTime, endTime); // Pass room name
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Slots created successfully',
            data: slots,
        });
    } catch (error) {

        if(error instanceof Error){
            res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
        }

        
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

export const updateSlotController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedSlot = await SlotService.updateSlot(id, updateData);

        res.status(200).json({
            success: true,
            message: 'Slot updated successfully',
            data: updatedSlot,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Error updating slot',
                error: error.message,  
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error updating slot',
                error: 'An unknown error occurred',
            });
        }
    }
});

export const deleteSlotController = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    

    try {
        await SlotService.deleteSlot(id);

        res.status(200).json({
            success: true,
            message: 'Slot deleted successfully',
        });
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({
            success: false,
            message: 'Error deleting slot',
            error: error.message,
        });
        }
        
    }
});

