import { TAcademicSemseter } from '../academicSemester/academicSemester.interface';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntiDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemseter>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntiDb,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
