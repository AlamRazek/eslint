import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntiDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { FacultyId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      FacultyId,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is retrieved successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      facultyId,
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is updated successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
