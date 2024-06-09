import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*"/);

  const extractMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: extractMessage,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleCastError;
