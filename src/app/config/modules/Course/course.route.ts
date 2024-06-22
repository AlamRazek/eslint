import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { courseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/:id', CourseControllers.getSingleCourse);

router.patch(
  '/:facultyId',
  validateRequest(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete('/:id', CourseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(courseValidations.assignFacultyWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;
