import { TAcademicSemseter } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

// year semester 4digit number
export const generateStudentId = async (payload: TAcademicSemseter) => {
  let currentId = (0).toString(); // 0000 by default

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lasStudentId?.substring(4, 6); //01;
  const lastStudentYear = lasStudentId?.substring(0, 4); //year 2030
  const curretntSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === curretntSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6); // 0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
