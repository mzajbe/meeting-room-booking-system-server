import mongoose, { model, Schema } from "mongoose";


export interface IBooking extends Document {
    date: string;
    slots: mongoose.Types.ObjectId[];
    room: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    totalAmount: number;
    isConfirmed: string;
    isDeleted: boolean;
}

const BookingSchema = new Schema<IBooking>({
    date: { type: String, required: true },
    slots: [{ type: Schema.Types.ObjectId, ref: 'Slot', required: true }],
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalAmount: { type: Number, required: true },
    // isConfirmed: { type: String, default: 'unconfirmed' },
    isConfirmed: { type: String, enum: ['unconfirmed', 'confirmed'], default: 'unconfirmed' },
    isDeleted: { type: Boolean, default: false }
});

export const Booking  = mongoose.model<IBooking>('Booking', BookingSchema);