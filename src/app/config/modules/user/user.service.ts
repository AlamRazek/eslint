import config from '../..';
import { TAcademicSemseter } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student.modul';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';

import { User } from './user.model';
import { generateStudentId } from './user.utils';

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

  // manual generate id
  userData.id = generateStudentId(admissionSemester);

  // create a user model
  const newUser = await User.create(userData); // built in static method

  //create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; // reference id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const USerServices = {
  createStudentIntoDB,
};
