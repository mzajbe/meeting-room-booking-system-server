import mongoose, { model, Schema, Types } from "mongoose";
import { TSlot } from "./slot.interface";


// interface TSlot extends Document {
//     room: Types.ObjectId;
//     date: string;
//     startTime: string;
//     endTime: string;
//     isBooked: boolean;
// }

const slotSchema:Schema = new Schema({
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    date: { type: String, required: true }, // Could also use Date type
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false }
});

export const Slot = model<TSlot>('Slot',slotSchema);