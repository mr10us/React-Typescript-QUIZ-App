export const parseAnswer = {
  toKeyValue: (inputValue: string) => {
    if (inputValue) {
      const [key, value] = inputValue.split("/");

      return { key, value };
    } else return null;
  },
  fromKeyValue: (key: string) => {
    return localStorage.getItem(key);
  },
};
