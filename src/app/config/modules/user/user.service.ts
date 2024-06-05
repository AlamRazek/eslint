import config from '../..';
import { TAcademicSemseter } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.modul';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';

import { User } from './user.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user
  const userData: Partial<TUser> = {};

  // if pass is not given use default password
  userData.password = password || (config.default_password as string);

  // set student rule
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set generate id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemseter,
    );

    // create a user model
    const newUser = await User.create([userData], { session }); // built in static method

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference id

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const USerServices = {
  createStudentIntoDB,
};
