import { StudentModel } from '../student.modul';
import { Student } from './student.interface';

const createStudentIntoDB = async (student: Student) => {
  // const result = await StudentModel.create(student); // built in static method

  const studentData = new StudentModel(student);
  const result = await studentData.save(); // built in instance method
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};
const deleteSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.deleteOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDb,
  deleteSingleStudentFromDb,
};
