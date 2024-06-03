import express from 'express';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/:semesterId', AcademicSemesterControllers.getAllAcademicSemester);

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAllAcademicSemester);

// router.get('/', StudentControllers.getAllStudents);

// router.get('/:studentId', StudentControllers.getOneStudent);

// router.delete('/:studentId', StudentControllers.deleteSingleStudent);

export const AcademicSemesterRoutes = router;
