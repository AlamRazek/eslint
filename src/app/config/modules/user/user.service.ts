import config from '../..';
import { TStudent } from '../student/student.interface';
import { NewUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user
  const userData: Partial<TUser> = {};

  // if pass is not given use default password
  userData.password = password || (config.default_password as string);

  // set student rule
  userData.role = 'student';

  // manual generate id
  userData.id = '203010001';

  // create a user model
  const result = await User.create(userData); // built in static method

  //create a student
  if (Object.keys(result).length) {
    studentData.id = result.id;
    studentData.user = result._id;
  }

  return result;
};

export const USerServices = {
  createStudentIntoDB,
};
