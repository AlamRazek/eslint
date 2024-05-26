import { USerServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using zod

    const { password, student: studentData } = req.body;

    // joi validation
    // const { error } = studentValidationSchema.validate(studentData);

    // data validation using zod

    //   const zodParsedData = StudentValidationSchema.parse(studentData);

    const result = await USerServices.createStudentIntoDB();

    // .......got from joi.......
    // if (error) {
    //   res.status(500).json({
    //     success: true,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};
