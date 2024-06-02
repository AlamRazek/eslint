// year semester 4digit number
export const generateStudentId = (payload: TAcademicSemseter) => {
  const currentId = (0).toString().padStart(4, '0');
  let incrementId = (Number(currentId) + 1).toString();

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
