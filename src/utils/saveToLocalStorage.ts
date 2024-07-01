export const saveToLocalStorage = (
  key: string,
  data: object | object[] | string
) => {
  if (typeof data === "string") localStorage.setItem(key, data);
  else {
    const stringifiedData = JSON.stringify(data);

    localStorage.setItem(key, stringifiedData);
  }
};
