import { Types } from "mongoose";


export type TRoom = {
    user:Types.ObjectId;
    name: string;
    roomNo: string;
    floorNo: number;
    capacity: number;  
    pricePerSlot: number; 
    amenities: string[];
    isDeleted: boolean;
}