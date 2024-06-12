import { string } from 'joi';
import { Admin } from './admin.model';
import QueryBuilder from '../../../builder/QueryBuilder';

const getAllADminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search()
    .filter()
    .sort();
};
