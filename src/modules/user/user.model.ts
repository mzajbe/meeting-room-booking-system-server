

// user.model.ts
import { Schema, Document,model } from 'mongoose';
import { TUser } from './user.interface';


interface TUserModel extends TUser, Document {}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], required: true },
});

// export default const User = model<TUserModel>('User', UserSchema);

export const User = model <TUserModel>('User',UserSchema);
