import { User } from './user.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User Already Exists');
  }

  const result = await User.create(studentData); // built in static method
  // const student = new Student(studentData);
  // const result = await student.save(); // build in instance method

  //  const studentData = new StudentModel(student);
  // const result = await studentData.save(); // built in instance method
  return result;
};

export const USerService = {
  createStudentIntoDB,
};
