

import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { UserModel } from './user.interface';

interface TUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
}

const UserSchema = new Schema<TUser,UserModel>(
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

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//static method
UserSchema.statics.isUserExistsByEmail = async function(email:string){
  return await User.findOne({email});
}

UserSchema.statics.isPasswordMatched = async function(plainTestPassword,hashedPassword){
  return await bcrypt.compare(
    plainTestPassword,
    hashedPassword,
);
}


export const User = model<TUser,UserModel>('User', UserSchema);
