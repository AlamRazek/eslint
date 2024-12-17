import express from 'express';
import { StudentControllers } from './student.controller';

import { updateStudentValidationSchema } from './student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),

  StudentControllers.getAllStudents,
);

router.get(
  '/:id ',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getOneStudent,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateSingleStudent,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentControllers.deleteSingleStudent,
);

export const StudentRoutes = router;
