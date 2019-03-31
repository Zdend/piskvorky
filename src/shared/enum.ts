export const getEnumValues = (enumObject: Object): Array<any> => {
  return Object.values(enumObject).filter(prop => !Number(enumObject[prop]));
};
