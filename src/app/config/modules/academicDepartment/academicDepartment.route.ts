import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get(
  '/:FacultyId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);

// router.get('/', StudentControllers.getAllStudents);

// router.get('/:studentId', StudentControllers.getOneStudent);

// router.delete('/:studentId', StudentControllers.deleteSingleStudent);

export const AcademicDepartmentRoutes = router;
