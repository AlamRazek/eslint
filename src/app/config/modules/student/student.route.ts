import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getOneStudent);

router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateSingleStudent,
);

router.delete('/:studentId', StudentControllers.deleteSingleStudent);

export const StudentRoutes = router;
