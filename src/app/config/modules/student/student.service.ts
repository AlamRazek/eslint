import { Student } from './student.modul';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const deleteSingleStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
// const deleteSingleStudentFromDb = async (id: string) => {
//   const result = await Student.deleteOne({ id });
//   return result;
// };

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDb,
  deleteSingleStudentFromDb,
};
