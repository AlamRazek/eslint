import Joi from 'joi';

// UserName schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(25)
    .required()
    .custom((value, helpers) => {
      const firstNameV =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      if (firstNameV !== value) {
        return helpers.message("'{{#label}}' must be in capitalize format");
      }
      return value;
    }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      if (!/^[A-Za-z]+$/.test(value)) {
        return helpers.message('"{{#label}}" is not valid');
      }
      return value;
    }),
});

// Guardian schema
const guardianValidationSchema = Joi.object({
  father: Joi.string().trim().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  mother: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

// LocalGuardian schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Student schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female').required(),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
    .optional(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImage: Joi.string().uri().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
