import validator from 'validator';
import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student/student.interface';

import bcrypt from 'bcrypt';
import config from '..';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name Max allowed length is 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameV =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameV === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
    trim: true,
    validate: {
      validator: function (value: string) {
        return validator.isAlpha(value, 'en-US', { ignore: ' -' });
      },
      message: '{VALUE} is not valid',
    },
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    validate: {
      validator: function (value: string) {
        return validator.isAlpha(value);
      },
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  father: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function (value: string) {
        return validator.isAlpha(value, 'en-US', { ignore: ' -' });
      },
      message: '{VALUE} is not valid',
    },
  },
  fatherOccupation: {
    type: String,

    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  mother: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },

  password: {
    type: String,
    required: [true, 'password is required'],
    maxlength: [20, 'password cannot be more than 20'],
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImage: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

studentSchema.pre<TStudent>('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});
studentSchema.post<TStudent>('save', function (doc, next) {
  doc.password = '';
  next();
});

// pre save middleware/hook
// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating  a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

/* studentSchema.methods.isUserExits = async function (id: string) {
  const existingUser = await Student.findOne({ id });
}; */

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
