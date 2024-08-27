

import { Schema, model, Document } from 'mongoose';

interface TUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
}

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
  },
  {
    timestamps: true,
    collection: 'User',
  }
);

export const User = model<TUser>('User', UserSchema);
