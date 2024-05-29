import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';
import { StudentValidations } from '../student/student.validation';

const router = express.Router();

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //validation
      // if everything alright it will move to controller using next
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

router.post(
  '/create-student',
  validateRequest(StudentValidations.StudentValidationSchema),
  UserControllers.createStudent,
);

export const UsersRoutes = router;
