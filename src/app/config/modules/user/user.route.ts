import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

const military = (req: Request, res: Response, next: NextFunction) => {
  console.log('i am a military');
  next();
};

router.post('/create-student', military, UserControllers.createStudent);

export const UsersRoutes = router;
