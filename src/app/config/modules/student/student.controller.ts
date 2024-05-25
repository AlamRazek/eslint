import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { z } from 'zod';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getOneStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student deleted successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  getAllStudents,
  getOneStudent,
  deleteSingleStudent,
};
