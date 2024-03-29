const validateParams = (
  queryObj: Record<string, unknown>,
  fields: string[]
) => {
  let filteredObject: Record<string, unknown> = {};
  for (const key of fields) {
    if (queryObj && Object.hasOwnProperty.call(queryObj, key)) {
      filteredObject[key] = queryObj[key];
    }
  }

  return filteredObject
};

export default validateParams
