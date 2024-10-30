import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate('AcademicFaculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  // Retrieve a single academic semester by its ID
  const result =
    await AcademicDepartment.findById(id).populate('AcademicFaculty');

  if (!result) {
    throw new Error('Academic Faculty not found'); // Handle case if semester doesn't exist
  }

  return result;
};

const UpdateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  UpdateAcademicDepartmentIntoDB,
};
