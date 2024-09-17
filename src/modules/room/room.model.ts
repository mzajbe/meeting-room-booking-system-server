import { model, Schema } from "mongoose";
import { TRoom } from "./room.interface";


const roomSchema = new Schema<TRoom>(
    {
        // user: {
        //   type: Schema.Types.ObjectId,
        //   ref: 'User', // Reference to the User model
        //   required: [true, 'User ID is required'], // Custom error message
        // },
        name: {
          type: String,
          required: [true, 'Room name is required'], // Custom error message
          trim: true,
        },
        roomNo: {
          type: String,
          required: [true, 'Room number is required'], // Custom error message
          unique: true, // Ensure that roomNo is unique
          trim: true,
        },
        floorNo: {
          type: Number,
          required: [true, 'Floor number is required'], // Custom error message
        },
        capacity: {
          type: Number,
          required: [true, 'Room capacity is required'], // Custom error message
        },
        image: {
          type: [String],
          required: [true, 'At least one room image is required'], // Custom error message
        },
        pricePerSlot: {
          type: Number,
          required: [true, 'Price per slot is required'], // Custom error message
        },
        description:{
          type:String,
          required:[true,'Description is required'],
        },
        amenities: {
          type: [String], // Array of strings for amenities
          default: [],
        },
        isDeleted: {
          type: Boolean,
          default: false, // Default to false, meaning not deleted
        },
      },
      {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
      }
    );
    
    // Create the Room model using the schema and export it
    const Room = model<TRoom>('Room', roomSchema);
    export default Room;