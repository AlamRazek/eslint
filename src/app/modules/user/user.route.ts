import express from 'express';

import { USerController } from './user.controller';
import { StudentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/create-student', USerController.createStudent);
router.post(
  '/create-student',
  validateRequest(StudentValidations.CreateStudentValidationSchema),
  USerController.createStudent,
);

export const UserRoutes = router;
