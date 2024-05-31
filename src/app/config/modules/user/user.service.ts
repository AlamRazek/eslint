import config from '../..';
import { TAcademicSemseter } from '../academicSemester/academicSemester.interface';
import { Student } from '../student.modul';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';

import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user
  const userData: Partial<TUser> = {};

  // if pass is not given use default password
  userData.password = password || (config.default_password as string);

  // set student rule
  userData.role = 'student';

  // year semester 4digit number
  const generalStudentId = (payload: TAcademicSemseter) => {};

  // manual generate id
  userData.id = generateStudentId();

  // create a user model
  const newUser = await User.create(userData); // built in static method

  //create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const USerServices = {
  createStudentIntoDB,
};
