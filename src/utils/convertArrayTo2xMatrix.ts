export const convertArrayTo2xMatrix = (array: object[]) => {
  const matrix = [];
  if (array)
    for (let i = 0; i < array.length; i += 2) {
      matrix.push(array.slice(i, i + 2));
    }
  return matrix;
};
