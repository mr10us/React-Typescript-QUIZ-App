import { saveToLocalStorage } from "../utils/saveToLocalStorage"

export const saveAnswer = async ({key, value} : {key: string, value: string}) => {
  saveToLocalStorage(key, value);

  return 200;
}