import { z } from 'zod';

const preRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});
const UpdatePreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(UpdatePreRequisiteCourseValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const facultyWithCourseValidationSchema = z.object({
  body: z.object({
    Faculties: z.array(z.string()),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultyWithCourseValidationSchema,
};
