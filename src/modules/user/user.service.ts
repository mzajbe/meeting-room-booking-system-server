
import { User } from './user.model';

const createUser = async (userData: any) => {
  // Hash the password before saving (implement this according to your security needs)
  // For example, using bcrypt: userData.password = await bcrypt.hash(userData.password, 10);

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
