import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemseter } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntiDb = async (payload: TAcademicSemseter) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntiDb,
};
