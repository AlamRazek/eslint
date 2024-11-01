import express from 'express';
import { StudentControllers } from './student.controller';

import { updateStudentValidationSchema } from './student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:id ', StudentControllers.getOneStudent);

router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateSingleStudent,
);

router.delete('/:id', StudentControllers.deleteSingleStudent);

export const StudentRoutes = router;
