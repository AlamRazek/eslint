import { Student } from '../student.modul';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  const result = await Student.create(studentData); // built in static method

  // const student = new Student(studentData);
  // const result = await student.save(); // build in instance method

  //  const studentData = new StudentModel(student);
  // const result = await studentData.save(); // built in instance method
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};
const deleteSingleStudentFromDb = async (id: string) => {
  const result = await Student.deleteOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDb,
  deleteSingleStudentFromDb,
};
