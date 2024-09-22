
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";



// Helper function to convert "HH:mm" to minutes since midnight
const convertTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

// Helper function to convert minutes since midnight to "HH:mm"
const convertMinutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

const createSlots = async (room: string, date: string, startTime: string, endTime: string, duration: number = 60) => {
    // Convert start and end time to minutes
    const startMinutes = convertTimeToMinutes(startTime);
    const endMinutes = convertTimeToMinutes(endTime);

    // Calculate total duration in minutes and number of slots
    const totalDuration = endMinutes - startMinutes;
    const numSlots = totalDuration / duration;

    const slots: TSlot[] = [];

    for (let i = 0; i < numSlots; i++) {
        const slotStartTime = startMinutes + i * duration;
        const slotEndTime = slotStartTime + duration;

        const newSlot = await Slot.create({
            room,
            date,
            startTime: convertMinutesToTime(slotStartTime),
            endTime: convertMinutesToTime(slotEndTime),
            isBooked: false
        });

        slots.push(newSlot);
    }

    return slots;
};

const getAvailableSlots = async (date?: string, roomId?: string) => {
    const filter: any = { isBooked: false };

    if (date) {
        filter.date = date;
    }

    if (roomId) {
        filter.room = roomId;
    }

    // Populate room details in the response
    const availableSlots = await Slot.find(filter).populate('room');

    return availableSlots;
};


export const SlotService = {
    getAvailableSlots,
    createSlots
};



