import httpStatus from 'http-status';
import QueryBuilder from '../../../builder/QueryBuilder';
import AppError from '../../../errors/AppError';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import mongoose from 'mongoose';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getAllSingleCoursesFromDb = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

//------ update course ------

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  session.startTransaction();

  // basic course info update

  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
      session,
    },
  );

  // check if there is any pre requisite courses to update
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // filter out the deleted field id
    const deletedPreRequisite = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisite } } },
    });

    // filter out the new course field
    const newPreRequisites = preRequisiteCourses?.filter(
      (el) => el.course && !el.isDeleted,
    );

    const newPreRequisitesCourses = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
    });
    console.log('1st', { newPreRequisites });
    console.log('2nd', newPreRequisitesCourses);
    console.log('3rd', preRequisiteCourses);
  }

  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );

  console.log(result);

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDb,
  getAllSingleCoursesFromDb,
  deleteCourseFromDB,
  updateCourseIntoDB,
};
