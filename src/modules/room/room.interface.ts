import { Types } from "mongoose";


export type TRoom = {
    // user:Types.ObjectId;
    name: string;
    roomNo: string;
    floorNo: number;
    capacity: number;
    image:string[]; 
    pricePerSlot: number;
    description:string, 
    amenities: string[];
    isDeleted: boolean;
}