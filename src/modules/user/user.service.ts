
import { User } from './user.model';

const createUser = async (userData: any) => {

  const newUser = await User.create(userData);
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

export const UserServices = {
  createUser,
};
