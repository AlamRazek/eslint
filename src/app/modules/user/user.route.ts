import express from 'express';

import { USerController } from './user.controller';
import { CreateStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';

const router = express.Router();

router.get('/create-student', USerController.createStudent);
router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(CreateStudentValidationSchema),
  USerController.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  USerController.createFaculty,
);

router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  USerController.createAdmin,
);

export const UserRoutes = router;
