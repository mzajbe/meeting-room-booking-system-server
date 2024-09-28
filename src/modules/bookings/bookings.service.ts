import Room from "../room/room.model";
import { Slot } from "../slot/slot.model";
import { User } from "../user/user.model";
import { Booking } from "./bookings.model";

export const createBooking = async (date: string, slots: string[], roomId: string, userId: string) => {
    try {
        // Log input values
        console.log('Booking creation started with:', { date, slots, roomId, userId });

        // 1. Check if all slots are available (isBooked: false)
        const availableSlots = await Slot.find({
            _id: { $in: slots },
            isBooked: false,
            date,
        });

        if (availableSlots.length !== slots.length) {
            const unavailableSlots = slots.filter(slotId => 
                !availableSlots.some(slot => slot._id.toString() === slotId)
            );
            console.error('Some slots are already booked:', unavailableSlots);

            // Return error message for specific unavailable slots
            throw new Error(`Some slots are already booked: ${unavailableSlots.join(', ')}`);
        }

        // 2. Mark the slots as booked
        const updateSlotsResult = await Slot.updateMany({ _id: { $in: slots } }, { isBooked: true });
        console.log('Slots updated as booked:', updateSlotsResult);

        // 3. Retrieve room and user details
        const room = await Room.findById(roomId);
        const user = await User.findById(userId);

        if (!room) {
            throw new Error('Room not found');
        }
        if (!user) {
            throw new Error('User not found');
        }

        // 4. Calculate total amount
        const totalAmount = room.pricePerSlot * slots.length;

        // 5. Create the booking
        const newBooking = await Booking.create({
            date,
            slots: availableSlots.map(slot => slot._id), // Store slot ids only
            room: roomId,
            user: userId,
            totalAmount,
            isConfirmed: 'unconfirmed',
            isDeleted: false,
        });
        console.log('Booking created:', newBooking);

        // 6. Populate the booking with room, user, and slots details
        const populatedBooking = await (await (await newBooking
            .populate('room'))
            .populate('user'))
            .populate('slots')

        console.log('Booking successfully populated:', populatedBooking);
        return populatedBooking;

    } catch (error ) {
        // console.error('Error during booking creation:', error);
        // throw new Error(error.message || 'Failed to create booking');

        if (error instanceof Error) {
            console.error('Error during booking creation:', error.message);
            throw new Error(error.message || 'Failed to create booking');
          } else {
            console.error('Unknown error during booking creation:', error);
            throw new Error('Failed to create booking due to an unknown error');
          }
    }
};

const getBookings = async () => {
    // Fetch all bookings and populate room, slots, and user details
    const bookings = await Booking.find()
        .populate('room')
        .populate('slots')
        .populate('user');

    return bookings;
};





export const BookingService = {
  createBooking,
  getBookings
};
