import { z } from 'zod';

const createRoomValidationSchema = z.object({
  body: z.object({
    // user: z.string().nonempty({ message: 'User ID is required' }).regex(/^[0-9a-fA-F]{24}$/, 'Invalid User ID format'),
    name: z.string().nonempty({ message: 'Room name is required' }).trim(),
    roomNo: z.string().nonempty({ message: 'Room number is required' }).trim(),
    floorNo: z.number().min(0, { message: 'Floor number is required' }),
    capacity: z.number().min(1, { message: 'Room capacity is required' }),
    image: z.string().nonempty({ message: 'Room image is required' }),
    pricePerSlot: z.number().min(0, { message: 'Price per slot is required' }),
    amenities: z.array(z.string()).optional(), 
    isDeleted: z.boolean().optional(),
  })
});

export const RoomValidation = {
    createRoomValidationSchema,
}