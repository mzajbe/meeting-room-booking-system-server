import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";


export interface TUser {
  _id:string,
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
}

export interface UserModel extends Model<TUser> {
  
  isUserExistsByEmail(email:string): Promise<TUser>;
  
  isPasswordMatched(plainTestPassword : string,hashedPassword: string): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;


