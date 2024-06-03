import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser } from './user.interface';
import config from '../..';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre<TUser>('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});
userSchema.post<TUser>('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
