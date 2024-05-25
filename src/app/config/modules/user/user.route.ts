import express from 'express';

const router = express.Router();

router.post('/create-student', USerControllers.createStudent);

export const UsersRoutes = router;
