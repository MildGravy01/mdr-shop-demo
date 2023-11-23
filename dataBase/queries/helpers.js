export const objectify = (result) => {
  return result.map((mysqlObj) => {
    return Object.assign({}, mysqlObj);
  });
};
