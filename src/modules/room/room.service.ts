import { TRoom } from "./room.interface";
import Room from "./room.model"


const createRoomIntoDB = async (payload:TRoom) =>{
    const result = await Room.create(payload);
    // console.log(result);
    
    return result;
}

const getSingleRoomFromDB = async (_id:string) => {
    const result = await Room.findById(_id);
    return result;
}

const getAllRoomFromDB = async () => {
    const result = await Room.find();
    return result;
}

const updateRoomFromDB = async (id:string,payload:Partial<TRoom>) => {
    const result = Room.findOneAndUpdate({_id:id},payload,{new:true});
    return result;
}


export const RoomService = {
    createRoomIntoDB,
    getSingleRoomFromDB,
    getAllRoomFromDB,
    updateRoomFromDB,
}