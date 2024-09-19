
import mongoose from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status-codes';

const createUser = async (userData: any) => {

  // Ensure the role is set to 'user' by default
  const role = userData.role || 'user';

  const newUser = await User.create({ ...userData, role });
  // Return only non-sensitive data
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    role: newUser.role,
    address: newUser.address,
  };
};




const getUsersByRole = async (role: string) => {
  return await User.find({ role });
};

const updateUserToAdminIntoDB = async() =>{
  
}


// const createAdminIntoDB = async (password:string,payload)=>{
//   const userData: Partial<TUser>={};

//   //if password is not given , use default password
//   userData.password = password || (config.default_password as string);


//   //set student role
//   userData.role = 'admin';

//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     //set  generated id
//     // userData.id = await generateAdminId();

//     // create a user (transaction-1)
//     const newUser = await User.create([userData], { session });

//     //create a admin
//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
//     }
//     // set id , _id as user
//     payload.id = newUser[0].id;
//     payload.user = newUser[0]._id; //reference _id

//     // create a admin (transaction-2)
//     const newAdmin = await User.create([payload], { session });

//     if (!newAdmin.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
//     }

//     await session.commitTransaction();
//     await session.endSession();

//     return newAdmin;
//   } catch (err: any) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error(err);
//   }

// }

export const UserServices = {
  createUser,
  getUsersByRole,
  // createAdminIntoDB,
};
