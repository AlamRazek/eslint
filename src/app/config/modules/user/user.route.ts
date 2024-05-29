import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';
import { StudentValidations } from '../student/student.validation';

const router = express.Router();

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(`i am a naiMan my name is ${name}`);

    //validation
    const zodParseData = await schema.parseAsync({
      body: req.body,
    });

    next();
  };
};

router.post(
  '/create-student',
  validateRequest(StudentValidations.StudentValidationSchema),
  UserControllers.createStudent,
);

export const UsersRoutes = router;
