import { Admin } from './admin.model';
import QueryBuilder from '../../../builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';

const getAllADminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdmin = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};
