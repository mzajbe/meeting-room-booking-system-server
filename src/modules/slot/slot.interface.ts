import { Types } from "mongoose";

export interface TSlot {
    // _id: string;
    room: Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
}