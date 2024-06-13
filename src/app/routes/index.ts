import { Router } from 'express';
import { UsersRoutes } from '../config/modules/user/user.route';
import { StudentRoutes } from '../config/modules/student/student.route';
import { AcademicSemesterRoutes } from '../config/modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../config/modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../config/modules/academicDepartment/academicDepartment.route';
import { AdminRoutes } from '../config/modules/Admin/admin.route';
import { FacultyRoutes } from '../config/modules/Faculty/faculty.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
