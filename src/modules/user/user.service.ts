// user.service.ts
import { TUser } from './user.interface';
import { User } from './user.model';



export const createUser = async (userData: TUser) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Error creating user');
  }
};
