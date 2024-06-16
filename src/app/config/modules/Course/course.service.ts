import { Course } from './course.model';

const createCourseIntoDB = async () => {
  const result = await Course.create();
  return result;
};

const getAllCoursesFromDb = async () => {
  const result = await Course.find();
  return result;
};
const getAllSingleCoursesFromDb = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};
const deleteCourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDb,
  getAllSingleCoursesFromDb,
  deleteCourseIntoDB,
};
